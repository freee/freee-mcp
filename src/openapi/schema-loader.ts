import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  type MinimalOperation,
  type MinimalPathItem,
  type MinimalSchema,
  MinimalSchemaSchema,
} from './minimal-types.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Resolve schemas directory based on runtime context.
// Bun.build bundles code into different entry points:
// - dist/index.esm.js: __dirname = .../dist → ./openapi/minimal
// - bin/freee-mcp.js: __dirname = .../bin → ../dist/openapi/minimal
// - development (bun): __dirname = .../src/openapi → ../../openapi/minimal
function getSchemasDir(): string {
  const candidates = [
    path.resolve(__dirname, './openapi/minimal'), // dist/index.esm.js
    path.resolve(__dirname, '../dist/openapi/minimal'), // bin/freee-mcp.js
    path.resolve(__dirname, '../../openapi/minimal'), // development (bun)
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  throw new Error(
    `Could not find minimal schema directory. Searched paths:\n${candidates.join('\n')}`,
  );
}

const schemasDir = getSchemasDir();

function loadSchema(filename: string): MinimalSchema {
  const filePath = path.join(schemasDir, filename);
  const content = fs.readFileSync(filePath, 'utf-8');
  const parsed = JSON.parse(content);
  const result = MinimalSchemaSchema.safeParse(parsed);
  if (!result.success) {
    throw new Error(`Invalid schema file ${filename}: ${result.error.message}`);
  }
  return result.data;
}

/**
 * スキーマソースの識別子。1 スキーマファイルに対応する。
 * サービスとは 1:1 ではなく、1 ソースを複数サービスが共有することがある。
 */
type SchemaSourceId =
  | 'accounting'
  | 'hr'
  | 'invoice'
  | 'pm'
  | 'sm'
  | 'it_management'
  | 'fixed_asset_management'
  | 'partner_management'
  | 'tax_return'
  | 'mcponly';

const SCHEMA_FILES: Record<SchemaSourceId, string> = {
  accounting: 'accounting.json',
  hr: 'hr.json',
  invoice: 'invoice.json',
  pm: 'pm.json',
  sm: 'sm.json',
  it_management: 'it-management.json',
  fixed_asset_management: 'fixed-asset-management.json',
  partner_management: 'partner-management.json',
  tax_return: 'tax-return.json',
  mcponly: 'mcponly.json',
};

// ソースを共有するサービスが複数あっても、読み込みと parse は 1 回で済ませる。
const _loadedSources = new Map<SchemaSourceId, MinimalSchema>();

function loadSource(sourceId: SchemaSourceId): MinimalSchema {
  let schema = _loadedSources.get(sourceId);
  if (schema === undefined) {
    schema = loadSchema(SCHEMA_FILES[sourceId]);
    _loadedSources.set(sourceId, schema);
  }
  return schema;
}

/**
 * サービス識別子。freee_api_* ツールの `service` パラメータとして LLM に見せる値。
 * ドメインの名前であって、スキーマファイルの名前ではない。
 */
export type ApiType =
  | 'accounting'
  | 'hr'
  | 'invoice'
  | 'pm'
  | 'sm'
  | 'it_management'
  | 'fixed_asset_management'
  | 'partner_management'
  | 'survey'
  | 'launch'
  | 'employee_evaluation'
  | 'tax_return';

interface ApiConfig {
  schema: MinimalSchema;
  baseUrl: string;
  name: string;
}

// サービスのメタデータ（スキーマ本体はアクセス時に遅延ロードする）
interface ServiceMetadata {
  /** 読みにいくスキーマソース。複数サービスで共有してよい。 */
  source: SchemaSourceId;
  /**
   * source が複数サービスを含むとき、このサービスが担当するパス範囲を切り出す prefix。
   * 省略時は source のパス全体を使う。minimal スキーマは tag を持たないため
   * （paths のみ）、絞り込みのセレクタにはパスを使う。
   */
  pathPrefix?: string;
  baseUrl: string;
  name: string;
}

const SERVICE_METADATA: Record<ApiType, ServiceMetadata> = {
  accounting: {
    source: 'accounting',
    baseUrl: 'https://api.freee.co.jp',
    name: 'freee会計 API',
  },
  hr: {
    source: 'hr',
    baseUrl: 'https://api.freee.co.jp/hr',
    name: 'freee人事労務 API',
  },
  invoice: {
    source: 'invoice',
    baseUrl: 'https://api.freee.co.jp/iv',
    name: 'freee請求書 API',
  },
  pm: {
    source: 'pm',
    baseUrl: 'https://api.freee.co.jp/pm',
    name: 'freee工数管理 API',
  },
  sm: {
    source: 'sm',
    baseUrl: 'https://api.freee.co.jp/sm',
    name: 'freee販売 API',
  },
  it_management: {
    source: 'it_management',
    baseUrl: 'https://api.freee.co.jp',
    name: 'freeeIT管理 API',
  },
  fixed_asset_management: {
    source: 'fixed_asset_management',
    baseUrl: 'https://api.freee.co.jp',
    name: 'freee固定資産 API',
  },
  partner_management: {
    source: 'partner_management',
    baseUrl: 'https://api.freee.co.jp',
    name: 'freee業務委託管理 API',
  },
  // 以下 3 つは mcponly ソースを pathPrefix で分け合う（1 ファイルに複数ドメインが同居する）。
  // いずれも freee-mcp（リモート版）限定で、stdio モードでは isMcpOnlyPath で弾かれる。
  survey: {
    source: 'mcponly',
    pathPrefix: '/hub/survey/',
    baseUrl: 'https://api.freee.co.jp',
    name: 'freeeサーベイ API',
  },
  launch: {
    source: 'mcponly',
    pathPrefix: '/hub/launch/',
    baseUrl: 'https://api.freee.co.jp',
    name: 'freee開業 API',
  },
  employee_evaluation: {
    source: 'mcponly',
    pathPrefix: '/hub/employee_evaluation/',
    baseUrl: 'https://api.freee.co.jp',
    name: '人事評価 API',
  },
  tax_return: {
    source: 'tax_return',
    baseUrl: 'https://api.freee.co.jp',
    name: 'freee申告 API',
  },
};

// Per-API lazy loading: only load schemas when accessed
const _loadedConfigs: Partial<Record<ApiType, ApiConfig>> = {};

// Cached compiled regex patterns for path matching (per schema path)
const _pathRegexCache = new Map<string, RegExp>();

/**
 * Build (and cache) a strict regex for matching concrete request paths to schema paths.
 *
 * Security assumption:
 * Path parameters are treated as a single URL path segment and MUST NOT contain URL
 * metacharacters such as `?`, `#`, `&`, or `=`.
 *
 * Rationale:
 * Using `[^/?#&=]+` for `{param}` placeholders prevents query/fragment smuggling
 * through path arguments (for example, `/resource/{id}` must not match
 * `/resource/123?company_id=...`).
 *
 * This is a defense-in-depth control and complements request validation in
 * `makeApiRequest`. Do not relax this to `[^/]+` without introducing equivalent
 * canonicalization/validation guarantees.
 */
function getPathRegex(schemaPath: string): RegExp {
  let regex = _pathRegexCache.get(schemaPath);
  if (!regex) {
    // Do not allow URL metacharacters (?, #, &, =) to match placeholders.
    // Using `[^/]+` would treat '/api/1/deals/{id}' as matching
    // '/api/1/deals/123?company_id=B', enabling query smuggling via a path argument.
    const pattern = schemaPath.replace(/\{[^}]+\}/g, '[^/?#&=]+');
    regex = new RegExp(`^${pattern}$`);
    _pathRegexCache.set(schemaPath, regex);
  }
  return regex;
}

/**
 * Resolve the base URL for a given API type.
 * Priority: per-service env var (FREEE_API_BASE_URL_{SERVICE}) > hardcoded default.
 */
function resolveBaseUrl(apiType: ApiType, defaultUrl: string): string {
  const envVar = `FREEE_API_BASE_URL_${apiType.toUpperCase()}`;
  const envUrl = process.env[envVar];
  if (envUrl) {
    return envUrl.replace(/\/+$/, '');
  }
  return defaultUrl;
}

/**
 * 集約スキーマソースから、あるサービスが担当するパスだけを取り出す。
 * pathPrefix 未指定なら、そのソースはこのサービス専用なので全体をそのまま返す。
 */
function selectPaths(schema: MinimalSchema, pathPrefix: string | undefined): MinimalSchema {
  if (pathPrefix === undefined) {
    return schema;
  }
  return {
    paths: Object.fromEntries(
      Object.entries(schema.paths).filter(([schemaPath]) => schemaPath.startsWith(pathPrefix)),
    ),
  };
}

function getApiConfig(apiType: ApiType): ApiConfig {
  if (!_loadedConfigs[apiType]) {
    const metadata = SERVICE_METADATA[apiType];
    _loadedConfigs[apiType] = {
      schema: selectPaths(loadSource(metadata.source), metadata.pathPrefix),
      baseUrl: resolveBaseUrl(apiType, metadata.baseUrl),
      name: metadata.name,
    };
  }
  // biome-ignore lint/style/noNonNullAssertion: config is guaranteed to be set by the if block above
  return _loadedConfigs[apiType]!;
}

/**
 * Reset cached API configs. For testing only.
 * @internal
 */
export function _resetApiConfigs(): void {
  for (const key of Object.keys(_loadedConfigs)) {
    delete _loadedConfigs[key as ApiType];
  }
  _loadedSources.clear();
  _pathRegexCache.clear();
  _cachedPathList = {};
  _mcpOnlyPaths = null;
}

// mcp-only（freee-mcp リモート版でのみ利用可）なパスの集合。
// 集約スキーマソース mcponly 由来のパスをそのまま採用する（provenance = mcponly.yml）。
// service ではなくパス単位で判定するため、どのサービス経由でも横断的に効く。
let _mcpOnlyPaths: string[] | null = null;

function getMcpOnlyPaths(): string[] {
  if (_mcpOnlyPaths === null) {
    try {
      _mcpOnlyPaths = Object.keys(loadSource('mcponly').paths);
    } catch {
      // mcponly スキーマが無い環境（未同期など）では mcp-only 判定を無効化する。
      _mcpOnlyPaths = [];
    }
  }
  return _mcpOnlyPaths;
}

/**
 * Whether a concrete request path is an mcp-only endpoint (freee-mcp リモート版 限定).
 *
 * Matches against the aggregated mcponly schema, honoring path parameters
 * (e.g. `/hub/survey/surveys/{survey_id}`). Used to block such calls in stdio
 * (local) mode and to steer users toward freee-mcp（リモート版）.
 */
export function isMcpOnlyPath(path: string): boolean {
  for (const schemaPath of getMcpOnlyPaths()) {
    if (schemaPath === path) {
      return true;
    }
    if (getPathRegex(schemaPath).test(path)) {
      return true;
    }
  }
  return false;
}

export const API_CONFIGS: Record<ApiType, ApiConfig> = new Proxy({} as Record<ApiType, ApiConfig>, {
  get(_, prop: string): ApiConfig | undefined {
    if (prop in SERVICE_METADATA) {
      return getApiConfig(prop as ApiType);
    }
    return undefined;
  },
  ownKeys(): string[] {
    return Object.keys(SERVICE_METADATA);
  },
  getOwnPropertyDescriptor(_, prop: string): PropertyDescriptor | undefined {
    if (prop in SERVICE_METADATA) {
      return {
        enumerable: true,
        configurable: true,
        value: getApiConfig(prop as ApiType),
      };
    }
    return undefined;
  },
});

interface PathValidationResult {
  isValid: boolean;
  message: string;
  operation?: MinimalOperation;
  actualPath?: string;
  apiType?: ApiType;
  baseUrl?: string;
}

/**
 * Internal helper to find a path and method in a specific API schema
 * Returns PathValidationResult if found, null otherwise
 */
function findPathInSchema(
  normalizedMethod: keyof MinimalPathItem,
  path: string,
  apiType: ApiType,
  config: ApiConfig,
): PathValidationResult | null {
  const paths = config.schema.paths;

  // Try exact match first
  if (path in paths) {
    const pathItem = paths[path];
    if (normalizedMethod in pathItem) {
      return {
        isValid: true,
        message: 'Valid path and method',
        operation: pathItem[normalizedMethod],
        actualPath: path,
        apiType,
        baseUrl: config.baseUrl,
      };
    }
  }

  // Try pattern matching for paths with parameters
  for (const schemaPath of Object.keys(paths)) {
    const regex = getPathRegex(schemaPath);

    if (regex.test(path)) {
      const pathItem = paths[schemaPath];
      if (normalizedMethod in pathItem) {
        return {
          isValid: true,
          message: 'Valid path and method',
          operation: pathItem[normalizedMethod],
          actualPath: path,
          apiType,
          baseUrl: config.baseUrl,
        };
      }
    }
  }

  return null;
}

/**
 * Validates if a given path and method exist for a specific API service or across all APIs
 * When service is provided, validates only against that service's schema
 * When service is omitted, searches across all API schemas
 * Returns the validation result with base URL
 */
export function validatePathForService(
  method: string,
  path: string,
  service?: ApiType,
): PathValidationResult {
  const normalizedMethod = method.toLowerCase() as keyof MinimalPathItem;

  if (service !== undefined) {
    // Validate against specific service
    const config = API_CONFIGS[service];
    const result = findPathInSchema(normalizedMethod, path, service, config);
    if (result) {
      return result;
    }
    return {
      isValid: false,
      message: `Path '${path}' not found in ${config.name} schema. Please check the path format or use freee_api_list_paths to see available endpoints.`,
    };
  }

  // Search across all API schemas
  for (const [apiType, config] of Object.entries(API_CONFIGS) as [ApiType, ApiConfig][]) {
    const result = findPathInSchema(normalizedMethod, path, apiType, config);
    if (result) {
      return result;
    }
  }

  // Path not found in any API
  return {
    isValid: false,
    message: `Path '${path}' not found in any freee API schema. Please check the path format or use freee_api_list_paths to see available endpoints.`,
  };
}

// Cached results of listAllAvailablePaths (schemas don't change at runtime).
// Keyed by whether mcp-only paths are excluded.
let _cachedPathList: { all?: string; excludeMcpOnly?: string } = {};

export interface ListAllAvailablePathsOptions {
  /** mcp-only（freee-mcp リモート版限定）のパスを一覧から除外する。stdio モード用。 */
  excludeMcpOnly?: boolean;
}

/**
 * Lists all available paths across all API schemas, grouped by API type
 */
export function listAllAvailablePaths(options: ListAllAvailablePathsOptions = {}): string {
  const cacheKey = options.excludeMcpOnly ? 'excludeMcpOnly' : 'all';
  const cached = _cachedPathList[cacheKey];
  if (cached !== undefined) {
    return cached;
  }

  const sections: string[] = [];

  for (const config of Object.values(API_CONFIGS) as ApiConfig[]) {
    const paths = config.schema.paths;
    const pathList: string[] = [];

    Object.entries(paths).forEach(([path, pathItem]) => {
      if (options.excludeMcpOnly && isMcpOnlyPath(path)) {
        return;
      }

      const methods = Object.keys(pathItem as MinimalPathItem)
        .filter((m) => ['get', 'post', 'put', 'delete', 'patch'].includes(m))
        .map((m) => m.toUpperCase());

      if (methods.length > 0) {
        pathList.push(`  ${methods.join('|')} ${path}`);
      }
    });

    if (pathList.length > 0) {
      sections.push(`\n## ${config.name} (${config.baseUrl})\n${pathList.sort().join('\n')}`);
    }
  }

  const result = sections.join('\n');
  _cachedPathList[cacheKey] = result;
  return result;
}
