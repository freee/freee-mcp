#!/usr/bin/env bun

/**
 * Generate reference documentation from OpenAPI schemas
 * This script uses tag-mappings.json to determine English filenames
 */

import { join, dirname } from "path";
import { mkdir, readdir, readFile, unlink, writeFile } from "fs/promises";
import { existsSync } from "fs";
import { fileURLToPath } from "url";

// Path setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const SCRIPT_DIR = __dirname;
const PROJECT_ROOT = join(SCRIPT_DIR, "..");
const OPENAPI_DIR = join(PROJECT_ROOT, "openapi");
const OUTPUT_DIR = join(PROJECT_ROOT, "skills", "freee-api-skill", "references");
const SIGN_OUTPUT_DIR = join(PROJECT_ROOT, "skills", "freee-api-skill", "sign-references");
const MAPPINGS_FILE = join(OPENAPI_DIR, "tag-mappings.json");

// mcp-only（freee-mcp リモート版でのみ利用可）区分のエンドポイントを集約したスキーマ。
// このファイルに含まれるパスは「mcp-only」とみなし、該当タグのリファレンス冒頭に
// MCP_ONLY_BANNER を自動挿入する。将来 mcp-only 指定されるエンドポイントもこのファイルに
// 集約される想定なので、ドメイン固有の分岐は書かない（provenance = mcponly.yml 由来か）。
const MCPONLY_SCHEMA_FILE = join(OPENAPI_DIR, "mcponly-api-schema.json");

// リファレンス冒頭に挿入する mcp-only 注記。文言は recipe・実行時エラーと揃える。
const MCP_ONLY_BANNER =
  "⚠ freee-mcp（リモート版） 限定: このAPIは 「freee-mcp（リモート版）」でのみ利用できます。" +
  "freee_server_info の transport が stdio の場合は呼び出せません。" +
  "その際はユーザーに freee-mcp（リモート版）の設定" +
  "（https://support.freee.co.jp/hc/ja/articles/56390747520537）を案内してください。";

// mcp-only なパス集合。main() で mcponly-api-schema.json から読み込む。
const mcpOnlyPaths = new Set<string>();

// Type definitions
interface Parameter {
  $ref?: string;
  name?: string;
  in?: string;
  description?: string;
  required?: boolean;
  schema?: SchemaObject;
}

interface RequestBody {
  $ref?: string;
  content?: {
    [mediaType: string]: {
      schema?: SchemaObject;
    };
  };
  required?: boolean;
}

interface Response {
  $ref?: string;
  description?: string;
  content?: {
    [mediaType: string]: {
      schema?: SchemaObject;
    };
  };
}

interface SchemaObject {
  $ref?: string;
  type?: string;
  format?: string;
  description?: string;
  example?: unknown;
  enum?: unknown[];
  minimum?: number;
  maximum?: number;
  pattern?: string;
  required?: string[];
  properties?: {
    [key: string]: SchemaObject;
  };
  items?: SchemaObject;
  allOf?: SchemaObject[];
  oneOf?: SchemaObject[];
  anyOf?: SchemaObject[];
  discriminator?: {
    propertyName: string;
    mapping?: { [value: string]: string };
  };
  // 以下は OpenAPI の属性ではなく、union を合成したときに生成側が付ける内部情報。
  /** union の形の説明（例: `line_type により形が異なる: basic / text`） */
  unionNote?: string;
  /** 一部の形にしか存在しないプロパティ → それが存在する形のラベル */
  variantOnly?: { [propName: string]: string[] };
}

interface Operation {
  method: string;
  operationId?: string;
  summary?: string;
  description?: string;
  parameters?: Parameter[];
  requestBody?: RequestBody;
  responses?: {
    [statusCode: string]: Response;
  };
}

export interface PathData {
  path: string;
  operations: Operation[];
}

interface TagMappings {
  [apiName: string]: {
    [tagName: string]: string;
  };
}

export interface OpenAPISchema {
  tags?: Array<{ name: string; description?: string }>;
  paths: {
    [path: string]: {
      [method: string]: {
        tags?: string[];
        operationId?: string;
        summary?: string;
        description?: string;
        parameters?: Parameter[];
        requestBody?: RequestBody;
        responses?: {
          [statusCode: string]: Response;
        };
      };
    };
  };
  components?: {
    schemas?: {
      [key: string]: SchemaObject;
    };
    parameters?: {
      [key: string]: Parameter;
    };
    requestBodies?: {
      [key: string]: RequestBody;
    };
    responses?: {
      [key: string]: Response;
    };
  };
}

/**
 * OpenAPI の description に含まれる HTML（`<br>`・リンク・テーブル等）を取り除いて
 * プレーンテキストに正規化する。タグをそのまま残すとトークンの無駄なうえ、
 * `<td>` を単純に除去すると隣接セルが連結して読めなくなるので空白に置き換える。
 */
function cleanDescription(text: string): string {
  return text
    .replace(/<br\s*\/?>/gi, "\n")
    // セル区切りは同一行に保つ（整形済み HTML で改行されていても連結する）
    .replace(/<\/(td|th)>\s*/gi, " | ")
    .replace(/<\/(li|tr|p|div|h[1-6]|table|thead|tbody)>/gi, "\n")
    .replace(/<[^>]*>/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/ *\n */g, "\n")
    .replace(/ *\| *\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/**
 * Resolve a same-document `$ref` (JSON Pointer, RFC 6901) against the schema.
 *
 * `#/components/schemas/Name` だけでなく、`#/paths/~1projects/...`（工数管理 API が多用）や
 * `#/components/schemas/Name/properties/x/items` のような深いポインタも辿る。
 * 外部ファイル参照など解決できないものは undefined を返す。
 */
function resolvePointer(apiSchema: OpenAPISchema, ref: string): unknown {
  if (!ref.startsWith("#/")) return undefined;

  let current: unknown = apiSchema;
  for (const rawSegment of ref.slice(2).split("/")) {
    let segment: string;
    try {
      segment = decodeURIComponent(rawSegment);
    } catch {
      segment = rawSegment;
    }
    segment = segment.replace(/~1/g, "/").replace(/~0/g, "~");

    if (current === null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[segment];
  }
  return current;
}

/**
 * Resolve $ref in schema
 */
function resolveRef(
  schema: OpenAPISchema,
  ref: string
): SchemaObject | undefined {
  const resolved = resolvePointer(schema, ref);
  return resolved !== null && typeof resolved === "object"
    ? (resolved as SchemaObject)
    : undefined;
}

/**
 * Resolve $ref to a response object (e.g. `#/components/responses/Name`)
 *
 * 販売管理 API は成功レスポンスの大半を components.responses に切り出しているため、
 * 解決しないと `content` が読めずレスポンスが丸ごと出力されない。
 */
function resolveResponse(
  apiSchema: OpenAPISchema,
  response: Response,
  depth: number = 0
): Response {
  if (!response.$ref || depth >= MAX_RESOLVE_DEPTH) return response;
  const resolved = resolvePointer(apiSchema, response.$ref);
  if (resolved === null || typeof resolved !== "object") return response;
  return resolveResponse(apiSchema, resolved as Response, depth + 1);
}

/**
 * Resolve $ref to a parameter in components.parameters
 */
function resolveParameterRef(
  schema: OpenAPISchema,
  ref: string
): Parameter | undefined {
  const prefix = "#/components/parameters/";
  if (!ref.startsWith(prefix)) return undefined;
  const name = ref.slice(prefix.length);
  return schema.components?.parameters?.[name];
}

/**
 * Resolve $ref to a request body in components.requestBodies
 *
 * 販売管理 API は requestBody を components.requestBodies に切り出しているため、
 * 解決しないと `content` が読めずリクエストボディが丸ごと出力されない。
 */
function resolveRequestBody(
  apiSchema: OpenAPISchema,
  requestBody: RequestBody
): RequestBody {
  const prefix = "#/components/requestBodies/";
  if (!requestBody.$ref?.startsWith(prefix)) return requestBody;
  const name = requestBody.$ref.slice(prefix.length);
  return apiSchema.components?.requestBodies?.[name] ?? requestBody;
}

// $ref / allOf を辿る深さの上限。循環参照で無限再帰しないための保険。
const MAX_RESOLVE_DEPTH = 10;

/**
 * Merge an `allOf` composition into a single schema.
 *
 * 販売管理 API は共通項目を `allOf` で合成しているため、まとめないと
 * `properties` が空になり中身が出力されない。properties は後勝ちで上書きし、
 * required は和集合を取る。properties 以外の属性は先勝ち。
 */
function mergeAllOf(
  apiSchema: OpenAPISchema,
  members: SchemaObject[],
  depth: number
): SchemaObject {
  const merged: SchemaObject = {};
  const properties: { [key: string]: SchemaObject } = {};
  const required: string[] = [];

  for (const member of members) {
    const resolved = resolveSchema(apiSchema, member, depth + 1);

    Object.assign(properties, resolved.properties);
    if (resolved.required) required.push(...resolved.required);

    if (merged.type === undefined) merged.type = resolved.type;
    if (merged.format === undefined) merged.format = resolved.format;
    if (merged.description === undefined) merged.description = resolved.description;
    if (merged.example === undefined) merged.example = resolved.example;
    if (merged.enum === undefined) merged.enum = resolved.enum;
    if (merged.items === undefined) merged.items = resolved.items;
    if (merged.minimum === undefined) merged.minimum = resolved.minimum;
    if (merged.maximum === undefined) merged.maximum = resolved.maximum;
    if (merged.pattern === undefined) merged.pattern = resolved.pattern;
  }

  if (Object.keys(properties).length > 0) {
    merged.properties = properties;
    if (merged.type === undefined) merged.type = "object";
  }
  if (required.length > 0) {
    merged.required = [...new Set(required)];
  }

  return merged;
}

/**
 * union の各メンバー（形）を識別するラベルを返す。
 *
 * 優先順位: discriminator.mapping のキー（同じ schema を指す複数キーはまとめる）→
 * 各形の discriminator プロパティの enum → `$ref` の schema 名 → `パターンN`。
 */
function unionVariantLabels(
  apiSchema: OpenAPISchema,
  members: SchemaObject[],
  resolvedMembers: SchemaObject[],
  discriminator: SchemaObject["discriminator"]
): string[][] {
  return members.map((member, index) => {
    if (discriminator?.mapping && member.$ref) {
      const keys = Object.entries(discriminator.mapping)
        .filter(([, ref]) => ref === member.$ref)
        .map(([key]) => key);
      if (keys.length > 0) return keys;
    }
    if (discriminator) {
      const prop = resolvedMembers[index]?.properties?.[discriminator.propertyName];
      const values = prop ? resolveSchema(apiSchema, prop).enum : undefined;
      if (values && values.length > 0) return values.map(String);
    }
    if (member.$ref) {
      const name = member.$ref.split("/").pop();
      if (name) return [name];
    }
    return [`パターン${index + 1}`];
  });
}

/**
 * Merge a union of object schemas into a single object schema.
 *
 * 形ごとに分けて出すと共通項目（販売 API のカスタム項目は 12 形が同じ base を持つ）が
 * 重複するため、全形のプロパティを1つにまとめ、一部の形にしか無いものは `variantOnly` に
 * その形のラベルを記録する。必須は「そのプロパティを持つすべての形で必須」のときだけ付ける。
 * プロパティ定義が形ごとに異なる場合は先勝ち。ただし discriminator プロパティの enum は
 * 全形の値をまとめる（先勝ちだと最初の形の値しか出ない）。
 */
function mergeObjectUnion(
  apiSchema: OpenAPISchema,
  members: SchemaObject[],
  resolvedMembers: SchemaObject[],
  discriminator: SchemaObject["discriminator"]
): SchemaObject {
  const labels = unionVariantLabels(apiSchema, members, resolvedMembers, discriminator);
  const allLabels = labels.flat();

  const properties: { [key: string]: SchemaObject } = {};
  const presentIn: { [key: string]: number[] } = {};
  const requiredEverywhere: { [key: string]: boolean } = {};

  resolvedMembers.forEach((member, index) => {
    const required = member.required ?? [];
    for (const [name, prop] of Object.entries(member.properties ?? {})) {
      if (!(name in properties)) {
        properties[name] = prop;
        presentIn[name] = [];
        requiredEverywhere[name] = true;
      }
      presentIn[name].push(index);
      if (!required.includes(name)) requiredEverywhere[name] = false;
    }
  });

  const variantOnly: { [propName: string]: string[] } = {};
  for (const [name, indexes] of Object.entries(presentIn)) {
    if (indexes.length < resolvedMembers.length) {
      variantOnly[name] = indexes.flatMap((index) => labels[index]);
    }
  }

  const discriminatorName = discriminator?.propertyName;
  if (discriminatorName && properties[discriminatorName]) {
    properties[discriminatorName] = {
      ...resolveSchema(apiSchema, properties[discriminatorName]),
      enum: allLabels,
    };
  }

  const required = Object.keys(requiredEverywhere).filter(
    (name) => requiredEverywhere[name]
  );

  return {
    type: "object",
    properties,
    ...(required.length > 0 ? { required } : {}),
    ...(Object.keys(variantOnly).length > 0 ? { variantOnly } : {}),
    unionNote: discriminatorName
      ? `${discriminatorName} により形が異なる: ${allLabels.join(" / ")}`
      : `次のいずれかの形: ${allLabels.join(" / ")}`,
  };
}

/**
 * Resolve a `oneOf` / `anyOf` union.
 *
 * - 全メンバーが同じスカラー型: その型（TypeSpec の `Prefecture | ""` など）
 * - 全メンバーが object: プロパティを合成した1つの object（mergeObjectUnion）
 * - 配列を含まない異なる型の混在: `string | number` のような型表記
 * - 配列を含む union: 平坦化すると情報が落ちるので解決しない（undefined）
 */
function resolveUnion(
  apiSchema: OpenAPISchema,
  members: SchemaObject[],
  discriminator: SchemaObject["discriminator"],
  depth: number
): SchemaObject | undefined {
  const resolvedMembers = members.map((member) =>
    resolveSchema(apiSchema, member, depth + 1)
  );
  const memberType = (member: SchemaObject): string =>
    member.type ?? (member.properties ? "object" : "");
  const memberTypes = [...new Set(resolvedMembers.map(memberType))];

  if (memberTypes.includes("") || memberTypes.includes("array")) return undefined;

  if (memberTypes.length === 1) {
    if (memberTypes[0] !== "object") return { type: memberTypes[0] };
    // properties を持たない自由形式の object が混じる場合は合成できない
    if (resolvedMembers.every((member) => member.properties)) {
      return mergeObjectUnion(apiSchema, members, resolvedMembers, discriminator);
    }
    return undefined;
  }

  return { type: memberTypes.join(" | ") };
}

/**
 * Resolve a schema reference and supported schema compositions.
 *
 * Returns the original schema if no ref is present or cannot be resolved.
 * `allOf` ラッパーが自前の description を持つ場合は、合成結果より優先する
 * （referenced enum/object にインラインの説明を付ける TypeSpec の出力パターン）。
 */
function resolveSchema(
  apiSchema: OpenAPISchema,
  schema: SchemaObject,
  depth: number = 0
): SchemaObject {
  if (depth >= MAX_RESOLVE_DEPTH) return schema;

  if (schema.$ref) {
    const resolved = resolveRef(apiSchema, schema.$ref);
    return resolved ? resolveSchema(apiSchema, resolved, depth + 1) : schema;
  }
  if (schema.allOf && schema.allOf.length > 0) {
    const merged = mergeAllOf(apiSchema, schema.allOf, depth);
    return {
      ...merged,
      description: schema.description ?? merged.description,
    };
  }
  const unionMembers = schema.oneOf ?? schema.anyOf;
  if (unionMembers && unionMembers.length > 0) {
    const merged = resolveUnion(apiSchema, unionMembers, schema.discriminator, depth);
    if (!merged) return schema;
    // ラッパーの description・example 等は残し、union 自体の定義は解決済みなので外す
    const { oneOf: _oneOf, anyOf: _anyOf, discriminator: _discriminator, ...wrapper } =
      schema;
    return { ...wrapper, ...merged };
  }
  return schema;
}

/**
 * Get type description from schema
 */
function getTypeDescription(
  apiSchema: OpenAPISchema,
  schema: SchemaObject
): string {
  if (schema.type === "array" && schema.items) {
    // 要素が `$ref` / `allOf` の場合も参照先の型で表示する（未解決だと常に object になる）
    const itemType = resolveSchema(apiSchema, schema.items).type || "object";
    return `array[${itemType}]`;
  }
  if (schema.format) {
    return `${schema.type}(${schema.format})`;
  }
  return schema.type || "object";
}

/**
 * Options for formatSchemaProperties
 */
interface FormatOptions {
  indent?: string;
  maxDepth?: number;
  currentDepth?: number;
  /**
   * brief モードでは選択肢・例・制約を省き、名前・型・説明だけを出力する。
   * レスポンスは「呼べば実物が返る」ため詳細を持たせず、トークンを節約する。
   */
  brief?: boolean;
}

/**
 * 複数行の説明を箇条書きの中に埋め込むため、2行目以降をぶら下げインデントする。
 * 空行にはインデントを付けない（インデントだけの行が残るのを避ける）。
 */
function hangingIndent(text: string, indent: string): string {
  return text
    .split("\n")
    .map((line, i) => (i === 0 || line === "" ? line : `${indent}  ${line}`))
    .join("\n");
}

/**
 * Format schema properties as markdown
 *
 * 必須フィールドは名前の直後に `*` を付ける（任意は無印）。
 * 記法の凡例は SKILL.md の「リファレンス」セクションに置く。
 */
function formatSchemaProperties(
  apiSchema: OpenAPISchema,
  schema: SchemaObject,
  options: FormatOptions = {}
): string {
  const { indent = "", maxDepth = 2, currentDepth = 0, brief = false } = options;

  if (currentDepth >= maxDepth) {
    return "";
  }

  // リクエストボディ・レスポンス自体が union の場合は、注記を書くプロパティ行が無いので先頭に出す
  let result = currentDepth === 0 && schema.unionNote ? `${schema.unionNote}\n` : "";
  const properties = schema.properties || {};
  const required = schema.required || [];

  for (const [propName, propSchema] of Object.entries(properties)) {
    const requiredMark = required.includes(propName) ? "*" : "";

    // Resolve $ref or `allOf: [{ $ref }]` wrapper.
    const resolvedSchema = resolveSchema(apiSchema, propSchema);

    const typeDesc = getTypeDescription(apiSchema, resolvedSchema);
    result += `${indent}- ${propName}${requiredMark}: ${typeDesc}`;

    const propDesc = resolvedSchema.description
      ? cleanDescription(resolvedSchema.description)
      : "";
    if (propDesc) {
      const formattedDescription =
        maxDepth > 2
          ? propDesc.replace(/\s+/g, " ").trim()
          : hangingIndent(propDesc, indent);
      result += ` - ${formattedDescription}`;
    }

    // union 由来の注記。配列要素の union は「配列の要素:」行に書くと、深さ1の
    // レスポンスでは要素を出力しないため消えてしまう。プロパティ行に寄せる。
    const notes: string[] = [];
    const onlyIn = schema.variantOnly?.[propName];
    if (onlyIn) notes.push(`（${onlyIn.join(" / ")} のみ）`);
    if (resolvedSchema.unionNote) notes.push(`（${resolvedSchema.unionNote}）`);
    if (resolvedSchema.type === "array" && resolvedSchema.items) {
      const itemNote = resolveSchema(apiSchema, resolvedSchema.items).unionNote;
      // 英字で始まる注記（`line_type により…`）のときだけ区切りの空白を入れる
      if (itemNote) notes.push(`（要素は${/^[\x21-\x7e]/.test(itemNote) ? " " : ""}${itemNote}）`);
    }
    if (notes.length > 0) result += ` ${notes.join("")}`;

    if (!brief) {
      // Add enum values
      if (resolvedSchema.enum) {
        result += ` (選択肢: ${resolvedSchema.enum.join(", ")})`;
      }

      // Add example
      if (resolvedSchema.example !== undefined) {
        const exampleStr =
          typeof resolvedSchema.example === "string"
            ? resolvedSchema.example
            : JSON.stringify(resolvedSchema.example);
        result += ` 例: \`${exampleStr}\``;
      }

      // Add constraints
      const constraints: string[] = [];
      if (resolvedSchema.minimum !== undefined) {
        constraints.push(`最小: ${resolvedSchema.minimum}`);
      }
      if (resolvedSchema.maximum !== undefined) {
        constraints.push(`最大: ${resolvedSchema.maximum}`);
      }
      if (resolvedSchema.pattern) {
        constraints.push(`パターン: ${resolvedSchema.pattern}`);
      }
      if (constraints.length > 0) {
        result += ` (${constraints.join(", ")})`;
      }
    }

    result += "\n";

    // Recursively format nested properties
    if (resolvedSchema.properties && currentDepth < maxDepth - 1) {
      result += formatSchemaProperties(apiSchema, resolvedSchema, {
        indent: indent + "  ",
        maxDepth,
        currentDepth: currentDepth + 1,
        brief,
      });
    }

    // Handle array items
    if (
      resolvedSchema.type === "array" &&
      resolvedSchema.items &&
      currentDepth < maxDepth - 1
    ) {
      const itemSchema = resolveSchema(apiSchema, resolvedSchema.items);
      if (itemSchema.properties) {
        result += `${indent}  配列の要素:\n`;
        result += formatSchemaProperties(apiSchema, itemSchema, {
          indent: indent + "    ",
          maxDepth,
          currentDepth: currentDepth + 1,
          brief,
        });
      }
    }
  }

  return result;
}

/**
 * Format parameters as markdown
 *
 * markdown のテーブルはセル区切りとヘッダ行の固定コストが大きいため箇条書きで出す。
 * 大半が query なので `in` は query 以外のときだけ明示する。
 */
function formatParameters(
  apiSchema: OpenAPISchema,
  parameters: Parameter[]
): string {
  if (!parameters || parameters.length === 0) {
    return "";
  }

  let result = "";

  for (const rawParam of parameters) {
    const param = rawParam.$ref
      ? (resolveParameterRef(apiSchema, rawParam.$ref) ?? rawParam)
      : rawParam;

    const name = param.name || "";
    const parameterSchema = param.schema
      ? resolveSchema(apiSchema, param.schema)
      : undefined;
    const requiredMark = param.required ? "*" : "";
    const location = param.in && param.in !== "query" ? ` (${param.in})` : "";
    const type = parameterSchema ? getTypeDescription(apiSchema, parameterSchema) : "";
    const rawDescription =
      parameterSchema?.description || param.description || "";
    const description = rawDescription ? cleanDescription(rawDescription) : "";

    result += `- ${name}${requiredMark}${location}: ${type}`;
    if (description) {
      result += ` - ${hangingIndent(description, "")}`;
    }
    if (parameterSchema?.enum) {
      result += ` (選択肢: ${parameterSchema.enum.join(", ")})`;
    }
    result += "\n";
  }

  return result;
}

/**
 * Format request body as markdown
 */
function formatRequestBody(
  apiSchema: OpenAPISchema,
  requestBody: RequestBody
): string {
  if (!requestBody || !requestBody.content) {
    return "";
  }

  // Get JSON schema (prefer application/json)
  const jsonContent =
    requestBody.content["application/json"] ||
    requestBody.content["application/x-www-form-urlencoded"];

  if (!jsonContent || !jsonContent.schema) {
    return "";
  }

  // Resolve $ref or `allOf: [{ $ref }]` wrapper.
  const schema = resolveSchema(apiSchema, jsonContent.schema);

  return formatSchemaProperties(apiSchema, schema);
}

// レスポンスの description が定型句のみの場合は情報量がないので落とす
const GENERIC_RESPONSE_DESCRIPTIONS = new Set([
  "成功時",
  "正常終了",
  "OK",
  "Success",
  "successful operation",
  "No Content",
]);

/**
 * Format success response as markdown
 *
 * レスポンスは brief モード・深さ1で出力する。実際に API を呼べば全量が返るため、
 * リファレンスとしては「何が返るか」のトップレベルだけ分かれば足りる。
 */
function formatSuccessResponse(
  apiSchema: OpenAPISchema,
  responses: { [statusCode: string]: Response },
  maxDepth: number = 1
): string {
  if (!responses) {
    return "";
  }

  // Find success response (200, 201, 204)
  const successCodes = ["200", "201", "204"];
  let successResponse: Response | undefined;

  for (const code of successCodes) {
    if (responses[code]) {
      successResponse = resolveResponse(apiSchema, responses[code]);
      break;
    }
  }

  if (!successResponse) {
    return "";
  }

  let result = "";

  const description = successResponse.description
    ? cleanDescription(successResponse.description)
    : "";
  if (description && !GENERIC_RESPONSE_DESCRIPTIONS.has(description)) {
    result += `${description}\n`;
  }

  if (successResponse.content?.["application/xml"]) {
    result += "レスポンス形式: `application/xml`（推奨）\n\n";
  }

  // Get JSON schema
  const jsonContent = successResponse.content?.["application/json"];
  if (!jsonContent || !jsonContent.schema) {
    return result;
  }

  if (successResponse.content?.["application/xml"]) {
    result +=
      "参考: 以下は互換性のためOpenAPIに残っている `application/json`（廃止予定）のschemaです。新しい処理ではXMLを利用してください。\n\n";
  }

  // Resolve $ref or `allOf: [{ $ref }]` wrapper.
  const schema = resolveSchema(apiSchema, jsonContent.schema);

  result += formatSchemaProperties(apiSchema, schema, {
    maxDepth,
    brief: true,
  });

  return result;
}

/**
 * 1タグ分のリファレンス本文。renderReference() が作り、layoutReferences() が
 * 単独ファイルにするか束ねるかを決める。
 */
export interface RenderedReference {
  prefix: string;
  /** 単独ファイルにしたときのファイル名（束ねる場合も並び順のキーに使う） */
  fileName: string;
  tagName: string;
  summary: string;
  isMcpOnly: boolean;
  markdown: string;
}

/**
 * INDEX.md の1行分。束ねたファイルに入ったタグは lines に行範囲（1始まり・両端含む）を持つ。
 */
export interface IndexEntry {
  prefix: string;
  fileName: string;
  tagName: string;
  summary: string;
  isMcpOnly: boolean;
  lines?: { start: number; end: number };
}

/**
 * Extract endpoints by tag from OpenAPI schema
 */

function extractEndpointsByTag(
  schema: OpenAPISchema,
  tagName: string
): PathData[] {
  const results: PathData[] = [];

  for (const [path, pathItem] of Object.entries(schema.paths)) {
    const operations: Operation[] = [];

    for (const [method, operation] of Object.entries(pathItem)) {
      if (method === "parameters") continue;
      if (!operation.tags?.includes(tagName)) continue;

      operations.push({
        method: method.toUpperCase(),
        operationId: operation.operationId,
        summary: operation.summary,
        description: operation.description,
        parameters: operation.parameters,
        requestBody: operation.requestBody,
        responses: operation.responses,
      });
    }

    if (operations.length > 0) {
      results.push({ path, operations });
    }
  }

  return results;
}

/**
 * Build the endpoint sections of a reference document.
 *
 * ファイル出力から切り離してあるので、単体テストから直接呼べる。
 */
export function buildEndpointsMarkdown(
  schema: OpenAPISchema,
  endpoints: PathData[],
  apiName?: string
): string {
  // 同一ファイル内でブロック本文が完全一致したら初出への参照に置き換える。
  // 同じパラメータ群を持つエンドポイントが並ぶタグ（試算表など）で効果が大きい。
  // キーは「セクション種別 + 本文」。値は初出エンドポイントの `METHOD path`。
  const seenBlocks = new Map<string, string>();

  function emitSection(heading: string, body: string, endpointRef: string): string {
    const trimmed = body.trim();
    if (!trimmed) return "";

    const key = `${heading}\n${trimmed}`;
    const firstSeen = seenBlocks.get(key);
    if (firstSeen) {
      return `### ${heading}\n\n${firstSeen} と同じ\n\n`;
    }
    seenBlocks.set(key, endpointRef);
    return `### ${heading}\n\n${trimmed}\n\n`;
  }

  // Build endpoints markdown
  let endpointsMd = "";
  for (const { path, operations } of endpoints) {
    for (const operation of operations) {
      const { method, summary, description, parameters, requestBody, responses } =
        operation;

      const endpointRef = `${method} ${path}`;
      endpointsMd += `## ${endpointRef}${summary ? ` — ${summary}` : ""}\n\n`;

      if (description) {
        let cleanDesc = cleanDescription(description)
          .replace(/\s+/g, " ")
          .trim();

        if (cleanDesc.length > 500) {
          cleanDesc = cleanDesc.substring(0, 500) + "...";
        }

        if (cleanDesc) {
          // 「定義」「注意点」等のキーワードの前に改行を挿入して可読性を向上
          cleanDesc = cleanDesc
            .replace(/\s*(定義)\s+/g, "\n\n$1\n")
            .replace(/\s*(注意点)\s+/g, "\n\n$1\n");
          endpointsMd += `${cleanDesc}\n\n`;
        }
      }

      if (parameters && parameters.length > 0) {
        endpointsMd += emitSection(
          "パラメータ",
          formatParameters(schema, parameters),
          endpointRef
        );
      }

      if (requestBody) {
        // body 自体の必須性は schema の `required`（本文内フィールドの必須性）から
        // 推論できないので、見出しの `*` で表す。未指定の schema が多く、無指定を
        // 「任意」と書くと実態と食い違うため、明示的に true のときだけ付ける。
        // heading は重複判定キーにも入るので、同じ schema を使っていても
        // required が異なるエンドポイントは「◯◯ と同じ」に潰れない。
        const resolvedBody = resolveRequestBody(schema, requestBody);
        endpointsMd += emitSection(
          resolvedBody.required ? "リクエストボディ*" : "リクエストボディ",
          formatRequestBody(schema, resolvedBody),
          endpointRef
        );
      }

      if (responses) {
        const responseDepth = apiName === "tax-return-api" ? 3 : 1;
        endpointsMd += emitSection(
          "レスポンス",
          formatSuccessResponse(schema, responses, responseDepth),
          endpointRef
        );
      }
    }
  }

  return endpointsMd;
}

/**
 * 1タグ分のリファレンス本文を作る。エンドポイントが1つも無いタグ（スキーマから
 * 消えたタグが tag-mappings.json に残っている場合など）は null を返す。
 */
function renderReference(
  apiName: string,
  schema: OpenAPISchema,
  tagName: string,
  englishName: string,
  prefix: string
): RenderedReference | null {
  const fileName = `${prefix}-${englishName}.md`;

  // Get tag description from schema.
  // 説明がないタグは `${tagName}の操作` のような情報量ゼロの見出しになるだけなので出さない。
  const tag = schema.tags?.find((t) => t.name === tagName);
  const tagDesc = tag?.description ? cleanDescription(tag.description) : "";

  // Extract endpoints for this tag
  const endpoints = extractEndpointsByTag(schema, tagName);
  if (endpoints.length === 0) {
    console.warn(`  Skipped ${fileName}: tag "${tagName}" has no endpoints`);
    return null;
  }

  // mcp-only（freee-mcp リモート版限定）判定: このタグのいずれかのパスが
  // mcponly-api-schema.json 由来なら、リファレンス冒頭にバナーを挿入する。
  const isMcpOnly = endpoints.some(({ path }) => mcpOnlyPaths.has(path));
  const banner = isMcpOnly ? `\n${MCP_ONLY_BANNER}\n` : "";

  const endpointsMd = buildEndpointsMarkdown(schema, endpoints, apiName);

  const overview = tagDesc ? `\n${tagDesc}\n` : "";

  const markdown = `# ${tagName}
${banner}${overview}
${endpointsMd.trimEnd()}
`;

  return {
    prefix,
    fileName,
    tagName,
    // タグ説明がない API（pm 等）は日本語ラベルが取れないのでタグ名で代用する。
    summary: tagDesc || tagName,
    isMcpOnly,
    markdown,
  };
}

/**
 * これ未満のサイズ（バイト）のタグは service ごとに1ファイルへ束ねる。
 *
 * skill ディレクトリにはファイル数の上限（200）があるため、タグごとに1ファイル
 * だと API の追加でいずれ溢れる。一方で全部を大きなファイルにまとめると、
 * 1タグを調べるたびに読む量が増える。そこで小さいタグだけを束ね、INDEX.md に
 * 行範囲を載せて該当部分だけ読めるようにする。大きいタグは単独ファイルのまま。
 */
export const BUNDLE_THRESHOLD_BYTES = 8000;

/** 小さいタグを束ねたファイルの名前 */
export function bundleFileName(prefix: string): string {
  return `${prefix}-misc.md`;
}

function countLines(text: string): number {
  return text.split("\n").length;
}

/**
 * レンダリング済みのリファレンスを出力ファイルに割り付ける。
 *
 * service（prefix）ごとに BUNDLE_THRESHOLD_BYTES 未満のタグを `<prefix>-misc.md` に
 * 束ね、各タグの行範囲を IndexEntry.lines に記録する。束ねる対象が1つしかない
 * service は束ねてもファイル数が減らないので単独ファイルのままにする。
 */
export function layoutReferences(
  references: RenderedReference[],
  labels: Record<string, { label: string }>,
  threshold: number = BUNDLE_THRESHOLD_BYTES
): { files: Array<{ fileName: string; content: string }>; entries: IndexEntry[] } {
  const files: Array<{ fileName: string; content: string }> = [];
  const entries: IndexEntry[] = [];

  const toEntry = (ref: RenderedReference, fileName: string, lines?: IndexEntry["lines"]): IndexEntry => ({
    prefix: ref.prefix,
    fileName,
    tagName: ref.tagName,
    summary: ref.summary,
    isMcpOnly: ref.isMcpOnly,
    ...(lines ? { lines } : {}),
  });

  const prefixes = [...new Set(references.map((ref) => ref.prefix))];
  for (const prefix of prefixes) {
    const refs = references
      .filter((ref) => ref.prefix === prefix)
      .sort((a, b) => a.fileName.localeCompare(b.fileName));
    const small = refs.filter((ref) => Buffer.byteLength(ref.markdown, "utf-8") < threshold);
    const bundled = small.length >= 2 ? new Set(small) : new Set<RenderedReference>();

    // 束ねるタグの行範囲を先に確定させる
    const bundleFile = bundleFileName(prefix);
    const lineRanges = new Map<RenderedReference, { start: number; end: number }>();
    if (bundled.size > 0) {
      const label = labels[prefix]?.label ?? prefix;
      let content = `<!-- ${label} の小さいタグをまとめたファイル。タグごとの行範囲は INDEX.md を参照し、必要な範囲だけ読むこと。 -->\n`;
      for (const ref of bundled) {
        const body = ref.markdown.trimEnd();
        // 直前のタグとの間に空行を1つ挟む
        const start = countLines(content) + 1;
        lineRanges.set(ref, { start, end: start + countLines(body) - 1 });
        content += `\n${body}\n`;
      }
      files.push({ fileName: bundleFile, content });
    }

    // 索引は束ねたかどうかに関係なく、タグ名ベースの並びを保つ
    for (const ref of refs) {
      const lines = lineRanges.get(ref);
      if (lines) {
        entries.push(toEntry(ref, bundleFile, lines));
      } else {
        files.push({ fileName: ref.fileName, content: ref.markdown });
        entries.push(toEntry(ref, ref.fileName));
      }
    }
  }

  return { files, entries };
}

/**
 * Check if a string contains non-ASCII characters (e.g. Japanese)
 */
function containsNonAscii(text: string): boolean {
  return /[^\x00-\x7F]/.test(text);
}

/**
 * Convert a tag name to a kebab-case English name for use as filename.
 * Handles PascalCase, snake_case, space-separated, and other common patterns.
 * Returns null for non-ASCII tag names (e.g. Japanese) that need manual mapping.
 */
function tagNameToEnglishName(tagName: string): string | null {
  if (containsNonAscii(tagName)) {
    return null;
  }
  // Insert hyphens before uppercase letters in PascalCase (e.g. UnitCosts -> Unit-Costs)
  let name = tagName.replace(/([a-z0-9])([A-Z])/g, "$1-$2");
  // Replace underscores and spaces with hyphens
  name = name.replace(/[_\s]+/g, "-");
  return name.toLowerCase();
}

/**
 * Extract all tags actually used in paths of an OpenAPI schema
 */
function extractAllTags(schema: OpenAPISchema): string[] {
  const tags = new Set<string>();
  for (const pathItem of Object.values(schema.paths)) {
    for (const [key, operation] of Object.entries(pathItem)) {
      if (key === "parameters") continue;
      if (operation.tags) {
        for (const tag of operation.tags) {
          tags.add(tag);
        }
      }
    }
  }
  return Array.from(tags).sort();
}

// リファレンス生成対象外のタグ（認証フロー等、ユーザーが直接操作しないエンドポイント）
const TAG_BLACKLIST: Record<string, string[]> = {
  "sign-api": ["OAuth 2.0"],
};

/**
 * Sync tag mappings: add any tags found in schemas but missing from mappings.
 * Returns true if mappings were updated.
 */
async function syncTagMappings(
  mappings: TagMappings,
  apiConfigs: Array<{ apiKey: string; schemaFile: string }>
): Promise<boolean> {
  let updated = false;

  for (const { apiKey, schemaFile } of apiConfigs) {
    if (!existsSync(schemaFile)) continue;

    const schemaText = await readFile(schemaFile, "utf-8");
    const schema: OpenAPISchema = JSON.parse(schemaText);
    const tags = extractAllTags(schema);
    const blacklisted = TAG_BLACKLIST[apiKey] ?? [];

    if (!mappings[apiKey]) {
      mappings[apiKey] = {};
    }

    for (const tag of tags) {
      if (blacklisted.includes(tag)) continue;
      if (!(tag in mappings[apiKey])) {
        const englishName = tagNameToEnglishName(tag);
        if (englishName === null) {
          console.warn(`  Warning: ${apiKey} tag "${tag}" contains non-ASCII characters and needs manual mapping in tag-mappings.json`);
          continue;
        }
        mappings[apiKey][tag] = englishName;
        console.log(`  Added mapping: ${apiKey} "${tag}" -> "${englishName}"`);
        updated = true;
      }
    }
  }

  return updated;
}

/**
 * Process an API
 */
async function processApi(
  apiKey: string,
  schemaFile: string,
  prefix: string | undefined,
  tagServices: Record<string, string> | undefined,
  mappings: TagMappings
): Promise<RenderedReference[]> {
  console.log("");
  console.log(`Processing ${apiKey}...`);
  console.log("================================");

  // Read schema file
  const schemaText = await readFile(schemaFile, "utf-8");
  const schema: OpenAPISchema = JSON.parse(schemaText);

  // Get all tags from mappings
  const tagMappings = mappings[apiKey];
  if (!tagMappings) {
    console.log(`No mappings found for ${apiKey}`);
    return [];
  }

  const references: RenderedReference[] = [];
  for (const [tagName, englishName] of Object.entries(tagMappings)) {
    if (englishName) {
      const filePrefix = prefix ?? tagServices?.[tagName];
      if (filePrefix === undefined) {
        throw new Error(
          `Tag "${tagName}" in ${apiKey} has no service. ` +
            `Add it to tagServices in API_CONFIGS (and to SERVICE_LABELS).`
        );
      }
      const reference = renderReference(apiKey, schema, tagName, englishName, filePrefix);
      if (reference) references.push(reference);
    }
  }

  console.log(`Rendered ${references.length} tags for ${apiKey}`);
  return references;
}

// API configurations
interface ReferenceApiConfig {
  apiKey: string;
  schemaFile: string;
  /** このスキーマ全体が属する service。複数 service を含むスキーマでは tagServices を使う。 */
  prefix?: string;
  /**
   * タグ → service。複数 service を含むスキーマ用で、prefix の代わりに使う。
   * タグはリファレンスのグルーピング単位で service とは目的が違い、タグ名からは
   * ドメインの区切りを判定できないため、導出せず対応表で持つ。
   * ここに無いタグは生成時にエラーになる。値は SERVICE_LABELS のキーと一致させること。
   */
  tagServices?: Record<string, string>;
  outputDir: string;
}

const API_CONFIGS: ReferenceApiConfig[] = [
  { apiKey: "accounting-api", schemaFile: join(OPENAPI_DIR, "accounting-api-schema.json"), prefix: "accounting", outputDir: OUTPUT_DIR },
  { apiKey: "hr-api", schemaFile: join(OPENAPI_DIR, "hr-api-schema.json"), prefix: "hr", outputDir: OUTPUT_DIR },
  { apiKey: "invoice-api", schemaFile: join(OPENAPI_DIR, "invoice-api-schema.json"), prefix: "invoice", outputDir: OUTPUT_DIR },
  { apiKey: "pm-api", schemaFile: join(OPENAPI_DIR, "pm-api-schema.json"), prefix: "pm", outputDir: OUTPUT_DIR },
  { apiKey: "sm-api", schemaFile: join(OPENAPI_DIR, "sm-api-schema.json"), prefix: "sm", outputDir: OUTPUT_DIR },
  { apiKey: "it-management-api", schemaFile: join(OPENAPI_DIR, "it-management-api-schema.json"), prefix: "it-management", outputDir: OUTPUT_DIR },
  { apiKey: "fixed-asset-management-api", schemaFile: join(OPENAPI_DIR, "fixed-asset-management-api-schema.json"), prefix: "fixed-asset-management", outputDir: OUTPUT_DIR },
  { apiKey: "receivable-management-api", schemaFile: join(OPENAPI_DIR, "receivable-management-api-schema.json"), prefix: "receivable-management", outputDir: OUTPUT_DIR },
  { apiKey: "partner-management-api", schemaFile: join(OPENAPI_DIR, "partner-management-api-schema.json"), prefix: "partner-management", outputDir: OUTPUT_DIR },
  { apiKey: "tax-return-api", schemaFile: join(OPENAPI_DIR, "tax-return-api-schema.json"), prefix: "tax-return", outputDir: OUTPUT_DIR },
  // ここ由来のパスは mcp-only とみなされ、各リファレンス冒頭に MCP_ONLY_BANNER が
  // 自動挿入される（generateReference 参照）。複数 service が 1 ファイルに同居するため
  // prefix ではなく tagServices を使う。
  {
    apiKey: "mcponly-api",
    schemaFile: MCPONLY_SCHEMA_FILE,
    tagServices: {
      survey: "survey",
      launch_kaigyo_application: "launch",
      employee_evaluation: "employee-evaluation",
    },
    outputDir: OUTPUT_DIR,
  },
  { apiKey: "sign-api", schemaFile: join(OPENAPI_DIR, "sign-api-schema.json"), prefix: "sign", outputDir: SIGN_OUTPUT_DIR },
];

// ファイル名 prefix -> freee_api_* ツールの service パラメータと日本語ラベル。
// キーは API_CONFIGS の prefix または tagServices の値と一致させること
// （新しいドメインを足したらここも足す）。
const SERVICE_LABELS: Record<string, { service: string; label: string }> = {
  accounting: { service: "accounting", label: "freee会計" },
  hr: { service: "hr", label: "freee人事労務" },
  invoice: { service: "invoice", label: "freee請求書" },
  pm: { service: "pm", label: "freee工数管理" },
  sm: { service: "sm", label: "freee販売" },
  "it-management": { service: "it_management", label: "freeeIT管理" },
  "fixed-asset-management": { service: "fixed_asset_management", label: "freee固定資産" },
  "receivable-management": { service: "receivable_management", label: "freee債権管理" },
  "partner-management": { service: "partner_management", label: "freee業務委託管理" },
  survey: { service: "survey", label: "freeeサーベイ" },
  launch: { service: "launch", label: "freee開業" },
  "employee-evaluation": { service: "employee_evaluation", label: "人事評価" },
  "tax-return": { service: "tax_return", label: "freee申告" },
};

/**
 * API_CONFIGS が使う service のうち、SERVICE_LABELS に無いものを返す。
 *
 * writeReferenceIndex は SERVICE_LABELS を起点に走査するため、綴りが違うと
 * リファレンスは生成されるのに INDEX.md から黙って漏れる。テストで担保する。
 */
export function findServicesMissingFromIndex(): string[] {
  const known = new Set(Object.keys(SERVICE_LABELS));
  const missing: string[] = [];

  for (const { prefix, tagServices, outputDir } of API_CONFIGS) {
    // sign は SIGN-GUIDE.md がリファレンス一覧を持つので索引の対象外。
    if (outputDir !== OUTPUT_DIR) continue;

    const services = tagServices ? Object.values(tagServices) : prefix ? [prefix] : [];
    for (const service of services) {
      if (!known.has(service)) missing.push(service);
    }
  }

  return missing;
}

/**
 * 索引の1行に埋め込める文字列にする（改行と区切り文字を潰す）
 */
function toIndexText(text: string): string {
  return text.replace(/\s*\n\s*/g, " ").replace(/\s*—\s*/g, " ").trim();
}

/**
 * 索引に載せる場所。束ねたファイルのタグは行範囲を付ける。
 */
export function formatIndexLocation(entry: IndexEntry): string {
  return entry.lines
    ? `${entry.fileName} L${entry.lines.start}-${entry.lines.end}`
    : entry.fileName;
}

/**
 * 今回生成しなかった .md を出力ディレクトリから消す。
 *
 * 束ねる・束ねないの割り付けはタグのサイズで変わるし、スキーマからタグが消える
 * こともあるので、前回の生成物が残るとファイル数が増え続けてしまう。
 */
async function removeStaleReferences(outputDir: string, keep: Set<string>): Promise<void> {
  for (const name of await readdir(outputDir)) {
    if (!name.endsWith(".md") || keep.has(name)) continue;
    await unlink(join(outputDir, name));
    console.log(`Removed stale reference: ${name}`);
  }
}

/**
 * Generate references/INDEX.md from the entries collected during generation.
 *
 * リファレンス本体と同じソース（tag-mappings.json + スキーマ）から作るので、
 * スキーマ同期でタグが増減しても索引が自動で追従する。手編集しないこと。
 */
async function writeReferenceIndex(entries: IndexEntry[], outputDir: string): Promise<void> {
  let markdown = `# API リファレンス索引

\`freee_api_*\` ツールの service ごとに、\`references/\` 内の各リファレンスを
「ファイル名 [行範囲] — 内容」の形式で列挙する。
目的の API が分かっている場合はここからファイルを特定し、分からない場合は
\`references/\` 全体をキーワード検索する。

\`L120-185\` のような行範囲が付いたものは、小さいタグを1ファイルに束ねたもの。
ファイル全体ではなく、その範囲だけを読む（Read なら offset=120, limit=66）。

このファイルは \`scripts/generate-references.ts\` が自動生成する（手編集しないこと）。
`;

  // prefix の並びは SERVICE_LABELS の定義順（＝ドメインの提示順）に固定する。
  for (const [prefix, { service, label }] of Object.entries(SERVICE_LABELS)) {
    const rows = entries.filter((entry) => entry.prefix === prefix);
    if (rows.length === 0) continue;

    markdown += `\n## ${service} - ${label}\n\n`;

    for (const entry of rows) {
      const mcpOnly = entry.isMcpOnly ? "⚠ freee-mcp（リモート版） 限定 / " : "";
      markdown += `- ${formatIndexLocation(entry)} — ${mcpOnly}${toIndexText(entry.summary)}\n`;
    }
  }

  const outputFile = join(outputDir, "INDEX.md");
  await writeFile(outputFile, markdown, "utf-8");
  console.log(`Generated: INDEX.md (${entries.length} tags)`);
}

// README の対応操作数を差し込むマーカー。スキーマを更新するたびに手で数え直すと
// すぐ古くなるので、generate:references がスキーマから再計算して置き換える。
const README_FILE = join(PROJECT_ROOT, "README.md");
const README_OPERATION_COUNT_START = "<!-- API-STATS-TOTAL-START -->";
const README_OPERATION_COUNT_END = "<!-- API-STATS-TOTAL-END -->";

// 操作としてカウントする HTTP メソッド。freee のスキーマは head / options を持たない。
const COUNTED_METHODS = ["get", "post", "put", "delete", "patch"] as const;

/**
 * スキーマ内の操作数（パス × HTTP メソッド）を数える。
 */
export function countOperations(schema: OpenAPISchema): number {
  let count = 0;
  for (const pathItem of Object.values(schema.paths ?? {})) {
    for (const method of COUNTED_METHODS) {
      if (pathItem[method]) count++;
    }
  }
  return count;
}

/**
 * README のマーカー間を操作数で置き換える。マーカーが見つからなければ null を返す。
 */
export function replaceOperationCount(
  readme: string,
  total: number
): string | null {
  const start = readme.indexOf(README_OPERATION_COUNT_START);
  if (start === -1) return null;

  const contentStart = start + README_OPERATION_COUNT_START.length;
  const end = readme.indexOf(README_OPERATION_COUNT_END, contentStart);
  if (end === -1) return null;

  return readme.slice(0, contentStart) + String(total) + readme.slice(end);
}

/**
 * README.md の対応操作数をスキーマから再計算して書き戻す。
 *
 * invoice と sm のようにパス文字列が重なる API があるが、ベース URL が異なる
 * 別エンドポイントなので API ごとに数えてそのまま合計する。
 */
async function updateReadmeOperationCount(
  configs: typeof API_CONFIGS
): Promise<void> {
  let total = 0;
  for (const { schemaFile } of configs) {
    if (!existsSync(schemaFile)) continue;
    const schema: OpenAPISchema = JSON.parse(
      await readFile(schemaFile, "utf-8")
    );
    total += countOperations(schema);
  }

  const readme = await readFile(README_FILE, "utf-8");
  const updated = replaceOperationCount(readme, total);
  if (updated === null) {
    console.warn(
      `Skipped README.md: ${README_OPERATION_COUNT_START} ... ${README_OPERATION_COUNT_END} markers not found`
    );
    return;
  }
  if (updated === readme) {
    console.log(`README.md operation count is up to date (${total} operations).`);
    return;
  }

  await writeFile(README_FILE, updated, "utf-8");
  console.log(`Updated README.md: ${total} operations`);
}

/**
 * Main execution
 */
async function main(): Promise<void> {
  try {
    console.log("Starting reference document generation...");
    console.log("========================================");

    // Check if mappings file exists, create empty if not
    if (!existsSync(MAPPINGS_FILE)) {
      console.log("Tag mappings file not found, creating empty mappings...");
      await writeFile(MAPPINGS_FILE, JSON.stringify({}, null, 2), "utf-8");
    }

    // Read mappings
    const mappingsText = await readFile(MAPPINGS_FILE, "utf-8");
    const mappings: TagMappings = JSON.parse(mappingsText);

    // Load the mcp-only path set from the aggregated mcponly schema (if present).
    // These paths drive the "freee-mcp（リモート版） 限定" banner in generateReference().
    if (existsSync(MCPONLY_SCHEMA_FILE)) {
      const mcpOnlySchema: OpenAPISchema = JSON.parse(
        await readFile(MCPONLY_SCHEMA_FILE, "utf-8")
      );
      for (const path of Object.keys(mcpOnlySchema.paths ?? {})) {
        mcpOnlyPaths.add(path);
      }
      console.log(`Loaded ${mcpOnlyPaths.size} mcp-only path(s) from mcponly-api-schema.json`);
    } else {
      console.log("mcponly-api-schema.json not found; no mcp-only banner will be injected.");
    }

    // Sync tag mappings from schemas
    console.log("");
    console.log("Syncing tag mappings...");
    const updated = await syncTagMappings(mappings, API_CONFIGS);
    if (updated) {
      await writeFile(MAPPINGS_FILE, JSON.stringify(mappings, null, 2) + "\n", "utf-8");
      console.log(`Updated ${MAPPINGS_FILE}`);
    } else {
      console.log("Tag mappings are up to date.");
    }

    // Create output directories
    const outputDirs = [...new Set(API_CONFIGS.map((c) => c.outputDir))];
    for (const dir of outputDirs) {
      await mkdir(dir, { recursive: true });
    }

    // Process each API
    const references: RenderedReference[] = [];
    for (const { apiKey, schemaFile, prefix, tagServices, outputDir } of API_CONFIGS) {
      const rendered = await processApi(apiKey, schemaFile, prefix, tagServices, mappings);
      if (outputDir === OUTPUT_DIR) {
        references.push(...rendered);
        continue;
      }
      // sign は SIGN-GUIDE.md がファイル名でリファレンス一覧を持っているので、
      // 束ねずにタグごとの単独ファイルのまま出力する。
      for (const ref of rendered) {
        await writeFile(join(outputDir, ref.fileName), ref.markdown, "utf-8");
      }
    }

    // references/ は小さいタグを束ねて出力する（ファイル数の上限対策）
    console.log("");
    const { files, entries } = layoutReferences(references, SERVICE_LABELS);
    for (const { fileName, content } of files) {
      await writeFile(join(OUTPUT_DIR, fileName), content, "utf-8");
    }
    console.log(`Wrote ${files.length} reference files for ${references.length} tags`);
    await removeStaleReferences(OUTPUT_DIR, new Set([...files.map((f) => f.fileName), "INDEX.md"]));

    // Generate references/INDEX.md
    await writeReferenceIndex(entries, OUTPUT_DIR);

    // Update the supported operation count in README.md
    await updateReadmeOperationCount(API_CONFIGS);

    console.log("");
    console.log("========================================");
    console.log("Reference generation complete!");
    console.log(`Output directory: ${OUTPUT_DIR}`);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

// Run main function.
// テストから buildEndpointsMarkdown を import しても生成が走らないよう、
// bun で直接実行されたときだけ main() を呼ぶ。
if (import.meta.main) {
  main();
}
