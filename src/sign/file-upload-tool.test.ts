import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { addSignFileUploadTool } from './file-upload-tool.js';

vi.mock('./file-upload.js', () => ({
  uploadSignDocument: vi.fn(),
}));

const { uploadSignDocument } = await import('./file-upload.js');

describe('sign/file-upload-tool', () => {
  let mockServer: McpServer;
  let mockTool: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockTool = vi.fn();
    mockServer = {
      registerTool: mockTool,
    } as unknown as McpServer;
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('sign_file_upload ツールを登録する', () => {
    addSignFileUploadTool(mockServer);

    expect(mockTool).toHaveBeenCalledTimes(1);
    expect(mockTool).toHaveBeenCalledWith(
      'sign_file_upload',
      expect.objectContaining({
        title: 'Sign ファイルアップロード',
        description: expect.any(String),
        inputSchema: expect.objectContaining({
          file_path: expect.anything(),
          folder_id: expect.anything(),
        }),
        annotations: expect.any(Object),
      }),
      expect.any(Function),
    );
  });

  it('成功時に文書IDとステータスを返す', async () => {
    vi.mocked(uploadSignDocument).mockResolvedValue({
      document: { id: 123, status: 'draft' },
    });

    addSignFileUploadTool(mockServer);
    const handler = mockTool.mock.calls[0][2];

    const result = await handler({
      file_path: '/path/to/契約書.pdf',
      folder_id: 10,
      title: '業務委託契約書',
    });

    expect(uploadSignDocument).toHaveBeenCalledWith(
      '/path/to/契約書.pdf',
      { folder_id: 10, title: '業務委託契約書' },
      undefined,
    );
    expect(result.content[0].text).toContain('文書を作成しました');
    expect(result.content[0].text).toContain('文書ID: 123');
    expect(result.content[0].text).toContain('ステータス: draft');
  });

  it('document_status などの任意パラメータを uploadSignDocument に引き渡す', async () => {
    vi.mocked(uploadSignDocument).mockResolvedValue({ document: { id: 1 } });

    addSignFileUploadTool(mockServer);
    const handler = mockTool.mock.calls[0][2];

    await handler({
      file_path: '/path/to/signed.pdf',
      folder_id: 10,
      uploader_id: 5,
      document_status: 'concluded',
    });

    expect(uploadSignDocument).toHaveBeenCalledWith(
      '/path/to/signed.pdf',
      { folder_id: 10, uploader_id: 5, document_status: 'concluded' },
      undefined,
    );
  });

  it('失敗時にエラーメッセージを返す', async () => {
    vi.mocked(uploadSignDocument).mockRejectedValue(
      new Error('ファイルが見つかりません: /missing.pdf'),
    );

    addSignFileUploadTool(mockServer);
    const handler = mockTool.mock.calls[0][2];

    const result = await handler({ file_path: '/missing.pdf', folder_id: 10 });

    expect(result.content[0].text).toContain('ファイルアップロードに失敗');
    expect(result.content[0].text).toContain('ファイルが見つかりません');
  });
});
