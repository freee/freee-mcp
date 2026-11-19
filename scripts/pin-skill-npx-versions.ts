#!/usr/bin/env bun

/**
 * Pins the freee-mcp version in the `npx` commands of the skill docs to the
 * package.json version, so users who follow the docs run the release that the
 * skill was written for. Runs from `bun run version` after changeset bumps
 * package.json.
 */

import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = join(__dirname, '..');
const SKILL_DIR = join(PROJECT_ROOT, 'skills', 'freee-api-skill');

export const PINNED_FILES = [join(SKILL_DIR, 'SETUP.md'), join(SKILL_DIR, 'SIGN-GUIDE.md')];

// `npx freee-mcp ...` and `npx --package=freee-mcp -- ...`, with or without a version.
const NPX_PACKAGE = /(npx (?:--package=)?freee-mcp)(?:@[\w.-]+)?(?=[\s`])/g;

export function pinNpxVersion(text: string, version: string): string {
  return text.replace(NPX_PACKAGE, `$1@${version}`);
}

export function findUnpinnedNpx(text: string, version: string): string[] {
  return text
    .split('\n')
    .filter((line) => /\bnpx\b/.test(line) && pinNpxVersion(line, version) !== line);
}

export function readPackageVersion(): string {
  return JSON.parse(readFileSync(join(PROJECT_ROOT, 'package.json'), 'utf-8')).version;
}

if (import.meta.main) {
  const version = readPackageVersion();
  for (const file of PINNED_FILES) {
    const text = readFileSync(file, 'utf-8');
    const pinned = pinNpxVersion(text, version);
    if (pinned !== text) {
      writeFileSync(file, pinned);
      console.log(`Pinned npx freee-mcp@${version} in ${file}`);
    }
  }
}
