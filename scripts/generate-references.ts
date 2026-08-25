#!/usr/bin/env bun

/**
 * Generate reference documentation from OpenAPI schemas
 * This script uses tag-mappings.json to determine English filenames
 */

import { join, dirname } from "path";
import { mkdir, readFile, writeFile } from "fs/promises";
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
 * Resolve $ref in schema
 */
function resolveRef(
  schema: OpenAPISchema,
  ref: string
): SchemaObject | undefined {
  // $ref format: "#/components/schemas/SchemaName"
  const parts = ref.split("/");
  if (parts[0] !== "#" || parts[1] !== "components" || parts[2] !== "schemas") {
    return undefined;
  }

  const schemaName = parts[3];
  return schema.components?.schemas?.[schemaName];
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
 * Resolve a union whose members all have the same scalar type.
 *
 * TypeSpec emits unions such as `Prefecture | ""` as `anyOf`, without a
 * top-level `type`. The reference generator can still describe these as a
 * scalar when every member resolves to the same scalar type. Structural and
 * mixed-type unions stay unresolved because flattening them would be lossy.
 */
function mergeHomogeneousScalarUnion(
  apiSchema: OpenAPISchema,
  members: SchemaObject[],
  depth: number
): SchemaObject | undefined {
  const resolvedMembers = members.map((member) =>
    resolveSchema(apiSchema, member, depth + 1)
  );
  const memberTypes = new Set(resolvedMembers.map((member) => member.type));

  if (memberTypes.size !== 1) return undefined;

  const type = resolvedMembers[0]?.type;
  if (!type || type === "array" || type === "object") return undefined;

  return { type };
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
  if (schema.anyOf && schema.anyOf.length > 0) {
    const merged = mergeHomogeneousScalarUnion(
      apiSchema,
      schema.anyOf,
      depth
    );
    return merged ? { ...schema, ...merged } : schema;
  }
  return schema;
}

/**
 * Get type description from schema
 */
function getTypeDescription(schema: SchemaObject): string {
  if (schema.type === "array" && schema.items) {
    const itemType = schema.items.type || "object";
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

  let result = "";
  const properties = schema.properties || {};
  const required = schema.required || [];

  for (const [propName, propSchema] of Object.entries(properties)) {
    const requiredMark = required.includes(propName) ? "*" : "";

    // Resolve $ref or `allOf: [{ $ref }]` wrapper.
    const resolvedSchema = resolveSchema(apiSchema, propSchema);

    const typeDesc = getTypeDescription(resolvedSchema);
    result += `${indent}- ${propName}${requiredMark}: ${typeDesc}`;

    const propDesc = resolvedSchema.description
      ? cleanDescription(resolvedSchema.description)
      : "";
    if (propDesc) {
      result += ` - ${hangingIndent(propDesc, indent)}`;
    }

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
    const requiredMark = param.required ? "*" : "";
    const location = param.in && param.in !== "query" ? ` (${param.in})` : "";
    const type = param.schema ? getTypeDescription(param.schema) : "";
    const rawDescription = param.schema?.description || param.description || "";
    const description = rawDescription ? cleanDescription(rawDescription) : "";

    result += `- ${name}${requiredMark}${location}: ${type}`;
    if (description) {
      result += ` - ${hangingIndent(description, "")}`;
    }
    if (param.schema?.enum) {
      result += ` (選択肢: ${param.schema.enum.join(", ")})`;
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
  responses: { [statusCode: string]: Response }
): string {
  if (!responses) {
    return "";
  }

  // Find success response (200, 201, 204)
  const successCodes = ["200", "201", "204"];
  let successResponse: Response | undefined;

  for (const code of successCodes) {
    if (responses[code]) {
      successResponse = responses[code];
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

  // Get JSON schema
  const jsonContent = successResponse.content?.["application/json"];
  if (!jsonContent || !jsonContent.schema) {
    return result;
  }

  // Resolve $ref or `allOf: [{ $ref }]` wrapper.
  const schema = resolveSchema(apiSchema, jsonContent.schema);

  result += formatSchemaProperties(apiSchema, schema, {
    maxDepth: 1,
    brief: true,
  });

  return result;
}

/**
 * Extract endpoints by tag from OpenAPI schema
 */
/**
 * INDEX.md の1行分。generateReference() が生成のついでに返す。
 */
interface IndexEntry {
  prefix: string;
  fileName: string;
  tagName: string;
  summary: string;
  isMcpOnly: boolean;
}

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
  endpoints: PathData[]
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
        endpointsMd += emitSection(
          "レスポンス",
          formatSuccessResponse(schema, responses),
          endpointRef
        );
      }
    }
  }

  return endpointsMd;
}

/**
 * Generate reference document for a single tag
 */
async function generateReference(
  apiName: string,
  schema: OpenAPISchema,
  tagName: string,
  englishName: string,
  prefix: string,
  outputDir: string
): Promise<IndexEntry> {
  const fileName = `${prefix}-${englishName}.md`;
  const outputFile = join(outputDir, fileName);

  // Get tag description from schema.
  // 説明がないタグは `${tagName}の操作` のような情報量ゼロの見出しになるだけなので出さない。
  const tag = schema.tags?.find((t) => t.name === tagName);
  const tagDesc = tag?.description ? cleanDescription(tag.description) : "";

  // Extract endpoints for this tag
  const endpoints = extractEndpointsByTag(schema, tagName);

  // mcp-only（freee-mcp リモート版限定）判定: このタグのいずれかのパスが
  // mcponly-api-schema.json 由来なら、リファレンス冒頭にバナーを挿入する。
  const isMcpOnly = endpoints.some(({ path }) => mcpOnlyPaths.has(path));
  const banner = isMcpOnly ? `\n${MCP_ONLY_BANNER}\n` : "";

  const endpointsMd = buildEndpointsMarkdown(schema, endpoints);

  const overview = tagDesc ? `\n${tagDesc}\n` : "";

  // Generate markdown document
  const markdown = `# ${tagName}
${banner}${overview}
${endpointsMd.trimEnd()}
`;

  await writeFile(outputFile, markdown, "utf-8");
  console.log(`Generated: ${fileName}`);

  return {
    prefix,
    fileName,
    tagName,
    // タグ説明がない API（pm 等）は日本語ラベルが取れないのでタグ名で代用する。
    summary: tagDesc || tagName,
    isMcpOnly,
  };
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
  prefix: string,
  mappings: TagMappings,
  outputDir: string
): Promise<IndexEntry[]> {
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

  const entries: IndexEntry[] = [];
  for (const [tagName, englishName] of Object.entries(tagMappings)) {
    if (englishName) {
      entries.push(
        await generateReference(apiKey, schema, tagName, englishName, prefix, outputDir)
      );
    }
  }

  console.log(`Generated ${entries.length} files for ${apiKey}`);
  return entries;
}

// API configurations
const API_CONFIGS = [
  { apiKey: "accounting-api", schemaFile: join(OPENAPI_DIR, "accounting-api-schema.json"), prefix: "accounting", outputDir: OUTPUT_DIR },
  { apiKey: "hr-api", schemaFile: join(OPENAPI_DIR, "hr-api-schema.json"), prefix: "hr", outputDir: OUTPUT_DIR },
  { apiKey: "invoice-api", schemaFile: join(OPENAPI_DIR, "invoice-api-schema.json"), prefix: "invoice", outputDir: OUTPUT_DIR },
  { apiKey: "pm-api", schemaFile: join(OPENAPI_DIR, "pm-api-schema.json"), prefix: "pm", outputDir: OUTPUT_DIR },
  { apiKey: "sm-api", schemaFile: join(OPENAPI_DIR, "sm-api-schema.json"), prefix: "sm", outputDir: OUTPUT_DIR },
  { apiKey: "it-management-api", schemaFile: join(OPENAPI_DIR, "it-management-api-schema.json"), prefix: "it-management", outputDir: OUTPUT_DIR },
  { apiKey: "partner-management-api", schemaFile: join(OPENAPI_DIR, "partner-management-api-schema.json"), prefix: "partner-management", outputDir: OUTPUT_DIR },
  // mcp-only 集約スキーマ。現状は survey のみ。ここ由来のパスは mcp-only とみなされ、
  // 生成される各リファレンス冒頭に MCP_ONLY_BANNER が自動挿入される（generateReference 参照）。
  { apiKey: "mcponly-api", schemaFile: MCPONLY_SCHEMA_FILE, prefix: "survey", outputDir: OUTPUT_DIR },
  { apiKey: "sign-api", schemaFile: join(OPENAPI_DIR, "sign-api-schema.json"), prefix: "sign", outputDir: SIGN_OUTPUT_DIR },
];

// ファイル名 prefix -> freee_api_* ツールの service パラメータと日本語ラベル。
// prefix は API_CONFIGS のものと一致させること（新しいドメインを足したらここも足す）。
const SERVICE_LABELS: Record<string, { service: string; label: string }> = {
  accounting: { service: "accounting", label: "freee会計" },
  hr: { service: "hr", label: "freee人事労務" },
  invoice: { service: "invoice", label: "freee請求書" },
  pm: { service: "pm", label: "freee工数管理" },
  sm: { service: "sm", label: "freee販売" },
  "it-management": { service: "it_management", label: "freeeIT管理" },
  survey: { service: "survey", label: "freeeサーベイ" },
};

/**
 * 索引の1行に埋め込める文字列にする（改行と区切り文字を潰す）
 */
function toIndexText(text: string): string {
  return text.replace(/\s*\n\s*/g, " ").replace(/\s*—\s*/g, " ").trim();
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
「ファイル名 — 内容」の形式で列挙する。
目的の API が分かっている場合はここからファイルを特定し、分からない場合は
\`references/\` 全体をキーワード検索する。

このファイルは \`scripts/generate-references.ts\` が自動生成する（手編集しないこと）。
`;

  // prefix の並びは SERVICE_LABELS の定義順（＝ドメインの提示順）に固定する。
  for (const [prefix, { service, label }] of Object.entries(SERVICE_LABELS)) {
    const rows = entries.filter((entry) => entry.prefix === prefix);
    if (rows.length === 0) continue;

    markdown += `\n## ${service} - ${label}\n\n`;

    for (const entry of rows.sort((a, b) => a.fileName.localeCompare(b.fileName))) {
      const mcpOnly = entry.isMcpOnly ? "⚠ freee-mcp（リモート版） 限定 / " : "";
      markdown += `- ${entry.fileName} — ${mcpOnly}${toIndexText(entry.summary)}\n`;
    }
  }

  const outputFile = join(outputDir, "INDEX.md");
  await writeFile(outputFile, markdown, "utf-8");
  console.log(`Generated: INDEX.md (${entries.length} references)`);
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
    const indexEntries: IndexEntry[] = [];
    for (const { apiKey, schemaFile, prefix, outputDir } of API_CONFIGS) {
      const entries = await processApi(apiKey, schemaFile, prefix, mappings, outputDir);
      // sign は SIGN-GUIDE.md がリファレンス一覧を持っているので索引の対象外。
      if (outputDir === OUTPUT_DIR) {
        indexEntries.push(...entries);
      }
    }

    // Generate references/INDEX.md
    console.log("");
    await writeReferenceIndex(indexEntries, OUTPUT_DIR);

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
