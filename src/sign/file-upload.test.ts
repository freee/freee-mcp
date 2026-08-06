import fs from 'node:fs/promises';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { setupTestTempDir } from '../test-utils/temp-dir.js';
import { uploadSignDocument } from './file-upload.js';

vi.mock('./client.js', () => ({
  makeSignApiRequest: vi.fn(),
}));

const { makeSignApiRequest } = await import('./client.js');

describe('sign/file-upload', () => {
  const { setup, cleanup, tempDir } = setupTestTempDir('freee-sign-upload-test-');

  beforeEach(async () => {
    await setup();
    vi.clearAllMocks();
  });

  afterEach(async () => {
    await cleanup();
  });

  async function writeTestFile(name: string, content: string | Buffer): Promise<string> {
    const filePath = tempDir.getFilePath(name);
    await fs.writeFile(filePath, content);
    return filePath;
  }

  it('draft: POST /v1/documents/uploads に Base64 化した file と必須パラメータを送る', async () => {
    const filePath = await writeTestFile('契約書.pdf', 'dummy-pdf-content');
    vi.mocked(makeSignApiRequest).mockResolvedValue({ document: { id: 1 } });

    await uploadSignDocument(filePath, { folder_id: 10, uploader_id: 5 });

    expect(makeSignApiRequest).toHaveBeenCalledTimes(1);
    expect(makeSignApiRequest).toHaveBeenCalledWith(
      'POST',
      '/v1/documents/uploads',
      undefined,
      {
        file: {
          name: '契約書.pdf',
          content: Buffer.from('dummy-pdf-content').toString('base64'),
        },
        uploader_id: 5,
        folder_id: 10,
      },
      undefined,
    );
  });

  it('draft: title / signers_count / skip_approval を指定した場合のみ body に含める', async () => {
    const filePath = await writeTestFile('doc.docx', 'word');
    vi.mocked(makeSignApiRequest).mockResolvedValue({ document: { id: 1 } });

    await uploadSignDocument(filePath, {
      folder_id: 10,
      uploader_id: 5,
      title: '業務委託契約書',
      signers_count: 2,
      skip_approval: false,
    });

    const body = vi.mocked(makeSignApiRequest).mock.calls[0][3] as Record<string, unknown>;
    expect(body.title).toBe('業務委託契約書');
    expect(body.signers_count).toBe(2);
    expect(body.skip_approval).toBe(false);
  });

  it('uploader_id 省略時は GET /v1/users/me の id で自動解決する', async () => {
    const filePath = await writeTestFile('doc.pdf', 'pdf');
    vi.mocked(makeSignApiRequest)
      .mockResolvedValueOnce({ id: 42, status: 'active' })
      .mockResolvedValueOnce({ document: { id: 1 } });

    await uploadSignDocument(filePath, { folder_id: 10 });

    expect(makeSignApiRequest).toHaveBeenNthCalledWith(
      1,
      'GET',
      '/v1/users/me',
      undefined,
      undefined,
      undefined,
    );
    const body = vi.mocked(makeSignApiRequest).mock.calls[1][3] as Record<string, unknown>;
    expect(body.uploader_id).toBe(42);
  });

  it('GET /v1/users/me が id を返さない場合はエラーにする', async () => {
    const filePath = await writeTestFile('doc.pdf', 'pdf');
    vi.mocked(makeSignApiRequest).mockResolvedValue({ status: 'active' });

    await expect(uploadSignDocument(filePath, { folder_id: 10 })).rejects.toThrow(
      'uploader_id を自動解決できませんでした',
    );
  });

  it('concluded: POST /v1/pdf_documents に pdf_file を送る', async () => {
    const filePath = await writeTestFile('締結済み.pdf', 'signed-pdf');
    vi.mocked(makeSignApiRequest).mockResolvedValue({ document: { id: 2 } });

    await uploadSignDocument(filePath, {
      folder_id: 10,
      uploader_id: 5,
      document_status: 'concluded',
    });

    expect(makeSignApiRequest).toHaveBeenCalledWith(
      'POST',
      '/v1/pdf_documents',
      undefined,
      {
        pdf_file: {
          name: '締結済み.pdf',
          content: Buffer.from('signed-pdf').toString('base64'),
        },
        uploader_id: 5,
        folder_id: 10,
      },
      undefined,
    );
  });

  it('concluded: PDF 以外のファイルはエラーにする', async () => {
    const filePath = await writeTestFile('doc.docx', 'word');

    await expect(
      uploadSignDocument(filePath, { folder_id: 10, document_status: 'concluded' }),
    ).rejects.toThrow('PDF のみ');
    expect(makeSignApiRequest).not.toHaveBeenCalled();
  });

  it('draft: 対応していない拡張子はエラーにする', async () => {
    const filePath = await writeTestFile('doc.txt', 'text');

    await expect(uploadSignDocument(filePath, { folder_id: 10 })).rejects.toThrow(
      '対応していないファイル形式',
    );
    expect(makeSignApiRequest).not.toHaveBeenCalled();
  });

  it('10MB を超えるファイルはエラーにする', async () => {
    const filePath = await writeTestFile('big.pdf', Buffer.alloc(10 * 1024 * 1024 + 1));

    await expect(uploadSignDocument(filePath, { folder_id: 10 })).rejects.toThrow(
      '上限(10MB)を超えています',
    );
    expect(makeSignApiRequest).not.toHaveBeenCalled();
  });

  it('存在しないファイルは分かりやすいエラーにする', async () => {
    await expect(
      uploadSignDocument(tempDir.getFilePath('missing.pdf'), { folder_id: 10 }),
    ).rejects.toThrow('ファイルが見つかりません');
  });
});
