/**
 * mcponly ソースに同居するサービスと、各サービスが担当するパス範囲。
 *
 * freee_api_* ツールのパス検証（schema-loader.ts）とリファレンス生成
 * （scripts/generate-references.ts）は、どちらもこの定義でサービスを判定する。
 * タグはリファレンスのグルーピング単位で、配信元の都合で分割・改名されるため、
 * サービスの判定には使わない。
 *
 * scripts/ からも import するため、このファイルは他のモジュールに依存させない
 * （schema-loader.ts は import 時にスキーマディレクトリを探索する）。
 */
export const MCPONLY_SERVICE_PATH_PREFIXES = {
  survey: '/hub/survey/',
  launch: '/hub/launch/',
  employee_evaluation: '/hub/employee_evaluation/',
} as const;
