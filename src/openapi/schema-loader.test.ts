import { afterEach, describe, expect, it } from 'vitest';
import {
  _resetApiConfigs,
  API_CONFIGS,
  type ApiType,
  isMcpOnlyPath,
  listAllAvailablePaths,
  validatePathForService,
} from './schema-loader.js';

describe('schema-loader', () => {
  describe('API_CONFIGS', () => {
    const apiTypes: ApiType[] = [
      'accounting',
      'hr',
      'invoice',
      'pm',
      'sm',
      'it_management',
      'partner_management',
      'survey',
      'tax_return',
    ];

    const expectedPrefixes: Record<ApiType, string> = {
      accounting: 'accounting',
      hr: 'hr',
      invoice: 'invoice',
      pm: 'pm',
      sm: 'sm',
      it_management: 'it-management',
      partner_management: 'partner-management',
      survey: 'survey',
      tax_return: 'tax-return',
    };

    it.each(apiTypes)('should return config for %s API', (apiType) => {
      const config = API_CONFIGS[apiType];

      expect(config).toBeDefined();
      expect(config.schema).toBeDefined();
      expect(config.schema.paths).toBeDefined();
      expect(config.baseUrl).toMatch(/^https:\/\/api\.freee\.co\.jp/);
      expect(config.prefix).toBe(expectedPrefixes[apiType]);
      expect(config.name).toContain('freee');
    });

    it('should return undefined for unknown API type', () => {
      // biome-ignore lint/suspicious/noExplicitAny: testing access with unknown key
      const config = (API_CONFIGS as any).unknown;
      expect(config).toBeUndefined();
    });

    it('should enumerate all API types with Object.keys', () => {
      const keys = Object.keys(API_CONFIGS);
      expect(keys).toEqual(expect.arrayContaining(apiTypes));
      expect(keys.length).toBe(apiTypes.length);
    });
  });

  describe('validatePathForService', () => {
    it('should validate existing path in accounting API', () => {
      const result = validatePathForService('GET', '/api/1/deals', 'accounting');

      expect(result.isValid).toBe(true);
      expect(result.apiType).toBe('accounting');
      expect(result.baseUrl).toBe('https://api.freee.co.jp');
    });

    it('should validate path with parameters', () => {
      const result = validatePathForService('GET', '/api/1/deals/123', 'accounting');

      expect(result.isValid).toBe(true);
      expect(result.actualPath).toBe('/api/1/deals/123');
    });

    it('should return invalid for non-existent path', () => {
      const result = validatePathForService('GET', '/api/1/nonexistent', 'accounting');

      expect(result.isValid).toBe(false);
      expect(result.message).toContain('not found');
    });

    it('should search across all APIs when service is not specified', () => {
      const result = validatePathForService('GET', '/api/1/deals');

      expect(result.isValid).toBe(true);
      expect(result.apiType).toBe('accounting');
    });

    it('should validate HR API paths', () => {
      const result = validatePathForService('GET', '/api/v1/employees', 'hr');

      expect(result.isValid).toBe(true);
      expect(result.apiType).toBe('hr');
      expect(result.baseUrl).toBe('https://api.freee.co.jp/hr');
    });

    it('should validate IT management API paths', () => {
      const result = validatePathForService('GET', '/hub/it_management/members', 'it_management');

      expect(result.isValid).toBe(true);
      expect(result.apiType).toBe('it_management');
      expect(result.baseUrl).toBe('https://api.freee.co.jp');
    });

    it('should return serialization metadata for referenced IT management parameters', () => {
      const result = validatePathForService(
        'GET',
        '/hub/it_management/application_accounts',
        'it_management',
      );

      expect(result.operation?.parameters).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: 'page_token',
            in: 'query',
            type: 'string',
            explode: false,
          }),
        ]),
      );
    });

    it('should return serialization metadata for array parameters', () => {
      const result = validatePathForService('GET', '/api/1/journals', 'accounting');

      expect(result.operation?.parameters).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: 'visible_tags[]',
            in: 'query',
            type: 'array',
            style: 'form',
            explode: true,
          }),
        ]),
      );
    });

    it('should validate survey API paths', () => {
      const result = validatePathForService('GET', '/hub/survey/base_surveys', 'survey');

      expect(result.isValid).toBe(true);
      expect(result.apiType).toBe('survey');
      expect(result.baseUrl).toBe('https://api.freee.co.jp');
    });

    it.each([
      '/hub/tax_return/corporate',
      '/hub/tax_return/corporate/office_info/10',
      '/hub/tax_return/corporate/sheet/national/10/schedule_1_blue',
      '/hub/tax_return/corporate/sheet/local/10/local_form_6/13000/13109',
      '/hub/tax_return/corporate/sheet/financial_statements/10/bs',
    ])('should validate tax return API path %s', (path) => {
      const result = validatePathForService('GET', path, 'tax_return');

      expect(result.isValid).toBe(true);
      expect(result.apiType).toBe('tax_return');
      expect(result.baseUrl).toBe('https://api.freee.co.jp');
    });

    it.each([
      '/hub/tax_return/corporate/sheet/national/10/10100100',
      '/hub/tax_return/corporate/sheet/local/10/206000000/13000/13109',
      '/hub/tax_return/corporate/sheet/financial_statements/10/balance_sheet',
    ])('should attach XML accept metadata to tax return sheet path %s', (path) => {
      const sheet = validatePathForService('GET', path, 'tax_return');
      expect(sheet.operation?.accept).toBe('application/xml');
    });

    it.each([
      '/hub/tax_return/corporate',
      '/hub/tax_return/corporate/office_info/10',
    ])('should not attach XML accept metadata to JSON tax return path %s', (path) => {
      const result = validatePathForService('GET', path, 'tax_return');

      expect(result.operation?.accept).toBeUndefined();
    });

    it('should reject unsupported write methods for tax return API', () => {
      const result = validatePathForService('POST', '/hub/tax_return/corporate', 'tax_return');

      expect(result.isValid).toBe(false);
    });

    it('should be case-insensitive for HTTP methods', () => {
      const result = validatePathForService('get', '/api/1/deals', 'accounting');

      expect(result.isValid).toBe(true);
    });

    it('should reject path containing smuggled query string', () => {
      const result = validatePathForService(
        'GET',
        '/api/1/deals/123?company_id=99999',
        'accounting',
      );

      expect(result.isValid).toBe(false);
      expect(result.message).toContain('not found');
    });

    it('should reject path containing fragment', () => {
      const result = validatePathForService('GET', '/api/1/deals/123#frag', 'accounting');

      expect(result.isValid).toBe(false);
    });

    it('should reject smuggled query string when searching across all APIs', () => {
      const result = validatePathForService('GET', '/api/1/deals/123?company_id=99999');

      expect(result.isValid).toBe(false);
    });
  });

  describe('resolveBaseUrl (env var overrides)', () => {
    const envVarNames = [
      'FREEE_API_BASE_URL_ACCOUNTING',
      'FREEE_API_BASE_URL_HR',
      'FREEE_API_BASE_URL_INVOICE',
      'FREEE_API_BASE_URL_PM',
      'FREEE_API_BASE_URL_SM',
      'FREEE_API_BASE_URL_IT_MANAGEMENT',
      'FREEE_API_BASE_URL_PARTNER_MANAGEMENT',
      'FREEE_API_BASE_URL_TAX_RETURN',
    ];

    afterEach(() => {
      for (const name of envVarNames) {
        delete process.env[name];
      }
      _resetApiConfigs();
    });

    it('should use default base URL when no env vars are set', () => {
      _resetApiConfigs();
      expect(API_CONFIGS.accounting.baseUrl).toBe('https://api.freee.co.jp');
      expect(API_CONFIGS.hr.baseUrl).toBe('https://api.freee.co.jp/hr');
      expect(API_CONFIGS.invoice.baseUrl).toBe('https://api.freee.co.jp/iv');
      expect(API_CONFIGS.pm.baseUrl).toBe('https://api.freee.co.jp/pm');
      expect(API_CONFIGS.sm.baseUrl).toBe('https://api.freee.co.jp/sm');
      expect(API_CONFIGS.it_management.baseUrl).toBe('https://api.freee.co.jp');
      expect(API_CONFIGS.tax_return.baseUrl).toBe('https://api.freee.co.jp');
    });

    it('should override with per-service env var', () => {
      process.env.FREEE_API_BASE_URL_HR = 'https://staging.example.com/hr';
      _resetApiConfigs();
      expect(API_CONFIGS.hr.baseUrl).toBe('https://staging.example.com/hr');
    });

    it('should not affect other services when one is overridden', () => {
      process.env.FREEE_API_BASE_URL_HR = 'https://staging.example.com/hr';
      _resetApiConfigs();
      expect(API_CONFIGS.accounting.baseUrl).toBe('https://api.freee.co.jp');
      expect(API_CONFIGS.invoice.baseUrl).toBe('https://api.freee.co.jp/iv');
      expect(API_CONFIGS.pm.baseUrl).toBe('https://api.freee.co.jp/pm');
      expect(API_CONFIGS.sm.baseUrl).toBe('https://api.freee.co.jp/sm');
      expect(API_CONFIGS.it_management.baseUrl).toBe('https://api.freee.co.jp');
    });

    it('should strip trailing slashes from env var values', () => {
      process.env.FREEE_API_BASE_URL_ACCOUNTING = 'https://staging.example.com/';
      _resetApiConfigs();
      expect(API_CONFIGS.accounting.baseUrl).toBe('https://staging.example.com');
    });

    it('should propagate overridden baseUrl through validatePathForService', () => {
      process.env.FREEE_API_BASE_URL_ACCOUNTING = 'https://staging.example.com';
      _resetApiConfigs();
      const result = validatePathForService('GET', '/api/1/deals', 'accounting');
      expect(result.isValid).toBe(true);
      expect(result.baseUrl).toBe('https://staging.example.com');
    });

    it('should override the tax return API with its per-service env var', () => {
      process.env.FREEE_API_BASE_URL_TAX_RETURN = 'https://staging.example.com/tax-return/';
      _resetApiConfigs();

      expect(API_CONFIGS.tax_return.baseUrl).toBe('https://staging.example.com/tax-return');
    });
  });

  describe('listAllAvailablePaths', () => {
    it('should return paths for all APIs', () => {
      const paths = listAllAvailablePaths();

      expect(paths).toContain('freee会計 API');
      expect(paths).toContain('freee人事労務 API');
      expect(paths).toContain('freee請求書 API');
      expect(paths).toContain('freee工数管理 API');
      expect(paths).toContain('freee販売 API');
      expect(paths).toContain('freee申告 API');
    });

    it('should include HTTP methods', () => {
      const paths = listAllAvailablePaths();

      expect(paths).toMatch(/GET|POST|PUT|DELETE|PATCH/);
    });

    it('should include API paths', () => {
      const paths = listAllAvailablePaths();

      expect(paths).toContain('/api/1/deals');
    });
  });

  describe('isMcpOnlyPath', () => {
    it('should return true for mcp-only survey paths', () => {
      expect(isMcpOnlyPath('/hub/survey/base_surveys')).toBe(true);
    });

    it('should match mcp-only paths with path parameters', () => {
      expect(isMcpOnlyPath('/hub/survey/surveys/10')).toBe(true);
      expect(isMcpOnlyPath('/hub/survey/base_surveys/1/surveys')).toBe(true);
    });

    it('should return false for non-mcp-only paths', () => {
      expect(isMcpOnlyPath('/api/1/deals')).toBe(false);
      expect(isMcpOnlyPath('/hub/it_management/members')).toBe(false);
      expect(isMcpOnlyPath('/hub/tax_return/corporate')).toBe(false);
    });

    it('should not match query-smuggling attempts against mcp-only paths', () => {
      expect(isMcpOnlyPath('/hub/survey/surveys/10?company_id=999')).toBe(false);
    });
  });
});
