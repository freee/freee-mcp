import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { APP_NAME, getConfigDir } from './constants.js';

const originalFreeeMcpConfigDir = process.env.FREEE_MCP_CONFIG_DIR;
const originalXdgConfigHome = process.env.XDG_CONFIG_HOME;

function restoreEnv(name: string, original: string | undefined): void {
  if (original !== undefined) {
    process.env[name] = original;
  } else {
    delete process.env[name];
  }
}

describe('getConfigDir', () => {
  beforeEach(() => {
    delete process.env.FREEE_MCP_CONFIG_DIR;
    delete process.env.XDG_CONFIG_HOME;
  });

  afterEach(() => {
    restoreEnv('FREEE_MCP_CONFIG_DIR', originalFreeeMcpConfigDir);
    restoreEnv('XDG_CONFIG_HOME', originalXdgConfigHome);
  });

  it('falls back to ~/.config/freee-mcp when no env vars are set', () => {
    expect(getConfigDir()).toBe(path.join(os.homedir(), '.config', APP_NAME));
  });

  it('uses $XDG_CONFIG_HOME/freee-mcp when XDG_CONFIG_HOME is set', () => {
    process.env.XDG_CONFIG_HOME = '/tmp/xdg-config';
    expect(getConfigDir()).toBe(path.join('/tmp/xdg-config', APP_NAME));
  });

  it('uses FREEE_MCP_CONFIG_DIR as-is without appending APP_NAME', () => {
    process.env.FREEE_MCP_CONFIG_DIR = '/tmp/freee-mcp-isolated';
    expect(getConfigDir()).toBe('/tmp/freee-mcp-isolated');
  });

  it('prefers FREEE_MCP_CONFIG_DIR over XDG_CONFIG_HOME', () => {
    process.env.FREEE_MCP_CONFIG_DIR = '/tmp/freee-mcp-isolated';
    process.env.XDG_CONFIG_HOME = '/tmp/xdg-config';
    expect(getConfigDir()).toBe('/tmp/freee-mcp-isolated');
  });
});
