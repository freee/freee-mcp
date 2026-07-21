import fs from 'node:fs/promises';
import path from 'node:path';
import type { SignTokenContext } from './client.js';
import { makeSignApiRequest } from './client.js';

// Sign API の仕様上限（POST /v1/documents/uploads・/v1/pdf_documents ともに 10MB 以下）
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

// POST /v1/documents/uploads が受け付けるファイル形式（PDF/Word/Excel/PowerPoint）
const DRAFT_ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx'];

interface StatusSpec {
  endpoint: string;
  fileKey: string;
  allowedExtensions: readonly string[];
  invalidExtMessage: (ext: string) => string;
  // draft は title/signers_count/skip_approval を受け付ける、concluded は受け付けない、を型ではなくデータで表明。
  // undefined 値は JSON.stringify で落ちるため per-field ガードは不要
  buildExtraBodyFields: (options: SignUploadOptions) => Record<string, unknown>;
}

// document_status ごとの差分 (endpoint / body の file キー / 受け付ける拡張子 / 追加 body フィールド)
// を 1 箇所で対応づける SSOT。document_status 値が追加されても Record の key 追加で拡張できる
const STATUS_SPECS: Record<'draft' | 'concluded', StatusSpec> = {
  draft: {
    endpoint: '/v1/documents/uploads',
    fileKey: 'file',
    allowedExtensions: DRAFT_ALLOWED_EXTENSIONS,
    invalidExtMessage: (ext) =>
      `対応していないファイル形式です: ${ext || '拡張子なし'} (対応形式: ${DRAFT_ALLOWED_EXTENSIONS.join(', ')})`,
    buildExtraBodyFields: (options) => ({
      title: options.title,
      signers_count: options.signers_count,
      skip_approval: options.skip_approval,
    }),
  },
  concluded: {
    endpoint: '/v1/pdf_documents',
    fileKey: 'pdf_file',
    allowedExtensions: ['.pdf'],
    invalidExtMessage: (ext) =>
      `document_status: 'concluded' (POST /v1/pdf_documents) で使用できるのは PDF のみです: ${ext || '拡張子なし'}`,
    buildExtraBodyFields: () => ({}),
  },
};

export interface SignUploadOptions {
  folder_id: number;
  uploader_id?: number;
  title?: string;
  document_status?: 'draft' | 'concluded';
  signers_count?: number;
  skip_approval?: boolean;
}

async function resolveUploaderId(tokenContext?: SignTokenContext): Promise<number> {
  const currentUser = (await makeSignApiRequest(
    'GET',
    '/v1/users/me',
    undefined,
    undefined,
    tokenContext,
  )) as { id?: number } | null;
  if (typeof currentUser?.id !== 'number') {
    throw new Error(
      'uploader_id を自動解決できませんでした。GET /v1/users/me で自分のユーザーIDを確認し、uploader_id に指定してください。',
    );
  }
  return currentUser.id;
}

export async function uploadSignDocument(
  filePath: string,
  options: SignUploadOptions,
  tokenContext?: SignTokenContext,
): Promise<unknown> {
  const resolvedPath = path.resolve(filePath);
  const documentStatus = options.document_status ?? 'draft';
  const extension = path.extname(resolvedPath).toLowerCase();
  const spec = STATUS_SPECS[documentStatus];

  if (!spec.allowedExtensions.includes(extension)) {
    throw new Error(spec.invalidExtMessage(extension));
  }

  let buffer: Buffer;
  try {
    buffer = await fs.readFile(resolvedPath);
  } catch (error) {
    const nodeError = error as NodeJS.ErrnoException;
    if (nodeError.code === 'ENOENT') {
      throw new Error(`ファイルが見つかりません: ${resolvedPath}`);
    }
    if (nodeError.code === 'EACCES') {
      throw new Error(`ファイルの読み取り権限がありません: ${resolvedPath}`);
    }
    throw error;
  }

  if (buffer.byteLength > MAX_FILE_SIZE_BYTES) {
    const sizeMB = (buffer.byteLength / (1024 * 1024)).toFixed(1);
    throw new Error(`ファイルサイズが Sign API の上限(10MB)を超えています: ${sizeMB}MB`);
  }

  const uploaderId = options.uploader_id ?? (await resolveUploaderId(tokenContext));
  const fileName = path.basename(resolvedPath);
  const content = buffer.toString('base64');

  const body: Record<string, unknown> = {
    [spec.fileKey]: { name: fileName, content },
    uploader_id: uploaderId,
    folder_id: options.folder_id,
    ...spec.buildExtraBodyFields(options),
  };
  return makeSignApiRequest('POST', spec.endpoint, undefined, body, tokenContext);
}
