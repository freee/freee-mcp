import express from 'express';
import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { FileUploadError } from '../api/file-upload.js';
import { UPLOAD_RECEIPTS_PATH } from '../constants.js';
import type { TokenStore } from '../storage/token-store.js';
import { createReceiptUploadHandler, createUploadCorsMiddleware } from './upload-endpoint.js';
import { signUploadTicket } from './upload-ticket.js';

vi.mock('../api/file-upload.js', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../api/file-upload.js')>();
  return { ...actual, uploadReceiptBuffer: vi.fn() };
});

const { uploadReceiptBuffer } = await import('../api/file-upload.js');

const SECRET = 'a-test-secret-that-is-at-least-32-characters-long';
const ISSUER = 'https://mcp.example.com';

function buildApp(): express.Express {
  const app = express();
  const tokenStore = {} as TokenStore;
  const cors = createUploadCorsMiddleware();
  app.options(UPLOAD_RECEIPTS_PATH, cors);
  app.post(
    UPLOAD_RECEIPTS_PATH,
    cors,
    createReceiptUploadHandler({ tokenStore, jwtSecret: SECRET, issuerUrl: ISSUER }),
  );
  return app;
}

async function ticketFor(userId = 'user-1', companyId = '12345'): Promise<string> {
  const { ticket } = await signUploadTicket({ userId, companyId }, SECRET, ISSUER);
  return ticket;
}

describe('upload endpoint', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('answers CORS preflight for any origin without credentials', async () => {
    const res = await request(buildApp())
      .options(UPLOAD_RECEIPTS_PATH)
      .set('Origin', 'https://sandbox.example.net')
      .set('Access-Control-Request-Method', 'POST');
    expect(res.status).toBe(204);
    expect(res.headers['access-control-allow-origin']).toBe('*');
    expect(res.headers['access-control-allow-headers']).toContain('Authorization');
    expect(res.headers['access-control-allow-credentials']).toBeUndefined();
  });

  it('rejects requests without a ticket', async () => {
    const res = await request(buildApp())
      .post(UPLOAD_RECEIPTS_PATH)
      .attach('receipt', Buffer.from('x'), 'a.pdf');
    expect(res.status).toBe(401);
    expect(res.body.error).toBe('missing_ticket');
    expect(uploadReceiptBuffer).not.toHaveBeenCalled();
  });

  it('rejects an invalid ticket', async () => {
    const res = await request(buildApp())
      .post(UPLOAD_RECEIPTS_PATH)
      .set('Authorization', 'Bearer not-a-ticket')
      .attach('receipt', Buffer.from('x'), 'a.pdf');
    expect(res.status).toBe(401);
    expect(res.body.error).toBe('invalid_ticket');
  });

  it('rejects non-multipart bodies', async () => {
    const res = await request(buildApp())
      .post(UPLOAD_RECEIPTS_PATH)
      .set('Authorization', `Bearer ${await ticketFor()}`)
      .set('Content-Type', 'application/json')
      .send('{}');
    expect(res.status).toBe(415);
  });

  it('rejects a multipart body without the receipt file', async () => {
    const res = await request(buildApp())
      .post(UPLOAD_RECEIPTS_PATH)
      .set('Authorization', `Bearer ${await ticketFor()}`)
      .field('description', 'memo');
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('missing_file');
  });

  it('rejects an oversized Content-Length up front', async () => {
    const res = await request(buildApp())
      .post(UPLOAD_RECEIPTS_PATH)
      .set('Authorization', `Bearer ${await ticketFor()}`)
      .set('Content-Type', 'multipart/form-data; boundary=x')
      .set('Content-Length', String(200 * 1024 * 1024))
      .send('');
    expect(res.status).toBe(413);
  });

  it('forwards the file and validated fields with the company from the ticket', async () => {
    vi.mocked(uploadReceiptBuffer).mockResolvedValue({ receipt: { id: 42, status: 'uploaded' } });
    const res = await request(buildApp())
      .post(UPLOAD_RECEIPTS_PATH)
      .set('Authorization', `Bearer ${await ticketFor('user-1', '12345')}`)
      .field('description', 'ファミリーマート レシート')
      .field('receipt_metadatum_amount', '460')
      .field('document_type', 'receipt')
      .field('company_id', '99999') // ignored: the ticket decides
      .attach('receipt', Buffer.from('%PDF-1.4'), {
        filename: 'receipt.pdf',
        contentType: 'application/pdf',
      });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ receipt: { id: 42, status: 'uploaded' } });
    expect(res.headers['access-control-allow-origin']).toBe('*');
    expect(uploadReceiptBuffer).toHaveBeenCalledTimes(1);
    const [file, companyId, options, ctx] = vi.mocked(uploadReceiptBuffer).mock.calls[0];
    expect(file.fileName).toBe('receipt.pdf');
    expect(file.mimeType).toBe('application/pdf');
    expect(file.buffer.toString()).toBe('%PDF-1.4');
    expect(companyId).toBe('12345');
    expect(options).toEqual({
      description: 'ファミリーマート レシート',
      receipt_metadatum_amount: 460,
      document_type: 'receipt',
    });
    expect(ctx).toMatchObject({ userId: 'user-1', companyId: '12345' });
  });

  it('falls back to the extension-based MIME type when the browser omits one', async () => {
    vi.mocked(uploadReceiptBuffer).mockResolvedValue({ receipt: { id: 1 } });
    const res = await request(buildApp())
      .post(UPLOAD_RECEIPTS_PATH)
      .set('Authorization', `Bearer ${await ticketFor()}`)
      .attach('receipt', Buffer.from('img'), { filename: 'photo.jpg', contentType: '' });
    expect(res.status).toBe(200);
    expect(vi.mocked(uploadReceiptBuffer).mock.calls[0][0].mimeType).toBe('image/jpeg');
  });

  it('rejects invalid metadata fields', async () => {
    const res = await request(buildApp())
      .post(UPLOAD_RECEIPTS_PATH)
      .set('Authorization', `Bearer ${await ticketFor()}`)
      .field('document_type', 'bogus')
      .attach('receipt', Buffer.from('x'), 'a.pdf');
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('invalid_fields');
    expect(uploadReceiptBuffer).not.toHaveBeenCalled();
  });

  it.each([
    ['file_too_large', undefined, 413],
    ['auth_required', undefined, 401],
    ['api_error', 422, 422],
    ['api_error', 429, 429],
    ['api_error', 500, 502],
    ['network_error', undefined, 502],
  ] as const)('maps FileUploadError %s (upstream %s) to HTTP %s', async (kind, upstream, expected) => {
    vi.mocked(uploadReceiptBuffer).mockRejectedValue(new FileUploadError(kind, 'boom', upstream));
    const res = await request(buildApp())
      .post(UPLOAD_RECEIPTS_PATH)
      .set('Authorization', `Bearer ${await ticketFor()}`)
      .attach('receipt', Buffer.from('x'), 'a.pdf');
    expect(res.status).toBe(expected);
    expect(res.body).toEqual({ error: kind, message: 'boom' });
  });

  it('returns 500 without leaking details on unexpected errors', async () => {
    vi.mocked(uploadReceiptBuffer).mockRejectedValue(new Error('redis down at 10.0.0.1'));
    const res = await request(buildApp())
      .post(UPLOAD_RECEIPTS_PATH)
      .set('Authorization', `Bearer ${await ticketFor()}`)
      .attach('receipt', Buffer.from('x'), 'a.pdf');
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'internal_error', message: 'Upload failed' });
  });
});
