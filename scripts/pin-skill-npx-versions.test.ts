import { readFileSync } from 'fs';
import { describe, expect, it } from 'vitest';
import {
  findUnpinnedNpx,
  PINNED_FILES,
  pinNpxVersion,
  readPackageVersion,
} from './pin-skill-npx-versions';

describe('pinNpxVersion', () => {
  it('npx freee-mcp と npx --package=freee-mcp にバージョンを付ける', () => {
    const text = [
      'npx freee-mcp configure',
      'npx --package=freee-mcp -- freee-sign-mcp configure',
      '`npx freee-mcp configure` の実行は不要です',
    ].join('\n');

    expect(pinNpxVersion(text, '1.2.3')).toBe(
      [
        'npx freee-mcp@1.2.3 configure',
        'npx --package=freee-mcp@1.2.3 -- freee-sign-mcp configure',
        '`npx freee-mcp@1.2.3 configure` の実行は不要です',
      ].join('\n'),
    );
  });

  it('既に付いているバージョンを置き換える', () => {
    expect(pinNpxVersion('npx --package=freee-mcp@0.1.0 -- freee-sign-mcp', '1.2.3')).toBe(
      'npx --package=freee-mcp@1.2.3 -- freee-sign-mcp',
    );
  });

  it('freee-mcp 以外のパッケージは変えない', () => {
    expect(pinNpxVersion('npx freee-mcp-other configure', '1.2.3')).toBe(
      'npx freee-mcp-other configure',
    );
  });
});

describe('skill の npx コマンド', () => {
  it('package.json のバージョンに固定されている', () => {
    const version = readPackageVersion();
    const unpinned = PINNED_FILES.flatMap((file) =>
      findUnpinnedNpx(readFileSync(file, 'utf-8'), version).map((line) => `${file}: ${line}`),
    );

    expect(unpinned).toEqual([]);
  });
});
