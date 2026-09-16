import { describe, expect, it } from 'vitest';
import { signAccessToken, verifyAccessToken } from './jwt.js';
import {
  InvalidUploadTicketError,
  signUploadTicket,
  uploadEndpointUrl,
  verifyUploadTicket,
} from './upload-ticket.js';

const SECRET = 'a-test-secret-that-is-at-least-32-characters-long';
const ISSUER = 'https://mcp.example.com';

describe('upload ticket', () => {
  it('round-trips userId and companyId', async () => {
    const { ticket, expiresAt } = await signUploadTicket(
      { userId: 'user-1', companyId: '12345' },
      SECRET,
      ISSUER,
    );
    expect(expiresAt).toBeGreaterThan(Math.floor(Date.now() / 1000));
    await expect(verifyUploadTicket(ticket, SECRET, ISSUER)).resolves.toEqual({
      userId: 'user-1',
      companyId: '12345',
    });
  });

  it('derives the audience from the issuer URL', () => {
    expect(uploadEndpointUrl('https://mcp.example.com')).toBe(
      'https://mcp.example.com/upload/receipts',
    );
    expect(uploadEndpointUrl('https://mcp.example.com/')).toBe(
      'https://mcp.example.com/upload/receipts',
    );
  });

  it('rejects a ticket signed with a different secret', async () => {
    const { ticket } = await signUploadTicket(
      { userId: 'user-1', companyId: '12345' },
      'another-secret-that-is-at-least-32-characters-long',
      ISSUER,
    );
    await expect(verifyUploadTicket(ticket, SECRET, ISSUER)).rejects.toBeInstanceOf(
      InvalidUploadTicketError,
    );
  });

  it('rejects a ticket issued for a different issuer', async () => {
    const { ticket } = await signUploadTicket(
      { userId: 'user-1', companyId: '12345' },
      SECRET,
      'https://other.example.com',
    );
    await expect(verifyUploadTicket(ticket, SECRET, ISSUER)).rejects.toBeInstanceOf(
      InvalidUploadTicketError,
    );
  });

  it('rejects an MCP access token used as an upload ticket', async () => {
    const accessToken = await signAccessToken(
      { sub: 'user-1', scope: 'mcp:read mcp:write', clientId: 'client-1' },
      SECRET,
      ISSUER,
      ISSUER,
    );
    await expect(verifyUploadTicket(accessToken, SECRET, ISSUER)).rejects.toBeInstanceOf(
      InvalidUploadTicketError,
    );
  });

  it('is not accepted as an MCP access token (grace-period audience mode)', async () => {
    const { ticket } = await signUploadTicket(
      { userId: 'user-1', companyId: '12345' },
      SECRET,
      ISSUER,
    );
    await expect(verifyAccessToken(ticket, SECRET, ISSUER, undefined)).rejects.toThrow(
      'JWT missing required claims',
    );
  });

  it('rejects garbage', async () => {
    await expect(verifyUploadTicket('not-a-jwt', SECRET, ISSUER)).rejects.toBeInstanceOf(
      InvalidUploadTicketError,
    );
  });
});
