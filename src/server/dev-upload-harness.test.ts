import express from 'express';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import {
  FILE_UPLOAD_TICKET_TOOL,
  FILE_UPLOAD_UI_RESOURCE_URI,
  FILE_UPLOAD_UI_TOOL,
} from '../mcp/file-upload-app.js';
import { createDevUploadHarnessHandler, DEV_UPLOAD_HARNESS_PATH } from './dev-upload-harness.js';

describe('dev upload harness', () => {
  it('serves an HTML host page that references the upload resource and tools', async () => {
    const app = express();
    app.get(DEV_UPLOAD_HARNESS_PATH, createDevUploadHarnessHandler());
    const res = await request(app).get(DEV_UPLOAD_HARNESS_PATH);
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/text\/html/);
    // Inline script/style must be allowed for the page and the srcdoc iframe it hosts.
    expect(res.headers['content-security-policy']).toContain("script-src 'self' 'unsafe-inline'");
    expect(res.headers['content-security-policy']).toContain("connect-src 'self'");
    expect(res.headers['cache-control']).toBe('no-store');
    expect(res.text).toContain(FILE_UPLOAD_UI_RESOURCE_URI);
    expect(res.text).toContain(FILE_UPLOAD_UI_TOOL);
    expect(res.text).toContain(FILE_UPLOAD_TICKET_TOOL);
    expect(res.text).toContain('ui/initialize');
    expect(res.text).toContain('ui/notifications/tool-result');
  });
});
