/**
 * mcponly ソースに同居するサービスと、各サービスが担当するパス範囲。
 * scripts/ からも import するため、他のモジュールに依存させない。
 */
export const MCPONLY_SERVICE_PATH_PREFIXES = {
  survey: '/hub/survey/',
  launch: '/hub/launch/',
  employee_evaluation: '/hub/employee_evaluation/',
} as const;
