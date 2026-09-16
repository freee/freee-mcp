import type { Request, RequestHandler, Response } from 'express';
import {
  FILE_UPLOAD_TICKET_TOOL,
  FILE_UPLOAD_UI_RESOURCE_URI,
  FILE_UPLOAD_UI_TOOL,
} from '../mcp/file-upload-app.js';

/**
 * Development-only page that plays the MCP Apps host for the upload view so
 * the whole flow (resource -> iframe -> ticket tool -> upload endpoint ->
 * freee API) can be exercised locally without Claude.ai or a tunnel.
 *
 * It is mounted only when the server runs in a development environment (same
 * gate as the insecure-localhost CIMD allowance). The page takes an MCP
 * access token (e.g. from MCP Inspector's OAuth flow) and speaks the same
 * JSON-RPC-over-postMessage protocol a real host does. It is NOT a faithful
 * sandbox: the iframe is same-origin, so CSP/CORS behaviour of real hosts is
 * not reproduced here.
 */
export const DEV_UPLOAD_HARNESS_PATH = '/dev/upload-harness';

// srcdoc iframes inherit this policy, so it must also allow the app's inline
// script/style and same-origin XHR to the upload endpoint.
const HARNESS_CSP =
  "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; " +
  "connect-src 'self'; img-src 'self' data:; frame-src 'self' blob: data:";

const HARNESS_HTML = `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8">
<title>freee-mcp dev: MCP Apps upload harness</title>
<style>
  /* freee Vibes tokens, same set as the upload app (src/mcp/file-upload-app-html.ts). */
  body {
    font-family: "-apple-system", BlinkMacSystemFont, "Helvetica Neue", "ヒラギノ角ゴ ProN",
      "Hiragino Kaku Gothic ProN", Arial, "メイリオ", Meiryo, sans-serif;
    font-size: .875rem; line-height: 1.5; margin: 1rem; max-width: 900px; color: #323232;
  }
  h1 { font-size: 1.125rem; }
  h3 { font-size: .875rem; }
  label { display: block; font-size: .75rem; color: #6e6b6b; margin-top: .5rem; }
  input[type=text] {
    width: 100%; font-family: inherit; font-size: .875rem; height: 2.25rem; padding: 0 .5rem;
    border: 1px solid #dcdcdc; border-radius: .5rem; box-sizing: border-box;
  }
  button {
    font-family: inherit; font-size: .875rem; font-weight: bold; height: 2.25rem; padding: 0 1rem;
    margin-top: .5rem; border: 0; border-radius: .5rem; background: #285ac8; color: #fff; cursor: pointer;
  }
  iframe { width: 100%; border: 1px solid #dcdcdc; border-radius: .5rem; margin-top: .75rem; height: 200px; }
  pre { background: #f7f5f5; padding: .5rem; font-size: .75rem; overflow: auto; max-height: 240px; border-radius: .5rem; }
  .row { display: flex; gap: 1rem; }
  .row > div { flex: 1; min-width: 0; }
  .err { color: #dc1e32; }
</style>
</head>
<body>
  <h1>MCP Apps upload harness (development only)</h1>
  <p>MCP のアクセストークン（MCP Inspector の OAuth で取得した Bearer）を貼り付けて「Load UI」を押すと、
  実ホストの代わりにこのページが <code>${FILE_UPLOAD_UI_TOOL}</code> を呼び、返ってきた UI リソースを iframe に描画します。</p>
  <label>MCP access token (Bearer)</label>
  <input type="text" id="token" placeholder="eyJ...">
  <button id="load">Load UI</button>
  <span id="status"></span>
  <iframe id="app" sandbox="allow-scripts allow-same-origin allow-forms" title="mcp-app"></iframe>
  <div class="row">
    <div><h3>Host log</h3><pre id="log"></pre></div>
    <div><h3>Model context (ui/update-model-context)</h3><pre id="ctx"></pre></div>
  </div>
<script>
(function () {
  'use strict';
  var RESOURCE_URI = ${JSON.stringify(FILE_UPLOAD_UI_RESOURCE_URI)};
  var UI_TOOL = ${JSON.stringify(FILE_UPLOAD_UI_TOOL)};
  var TICKET_TOOL = ${JSON.stringify(FILE_UPLOAD_TICKET_TOOL)};
  var $ = function (id) { return document.getElementById(id); };
  var iframe = $('app');
  var nextId = 1;
  var uiToolResult = null;

  function log(line, obj) {
    $('log').textContent += line + (obj !== undefined ? ' ' + JSON.stringify(obj) : '') + '\\n';
  }

  async function mcp(method, params) {
    var id = nextId++;
    var res = await fetch('/mcp', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + $('token').value.trim(),
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/event-stream',
        'Mcp-Protocol-Version': '2025-06-18'
      },
      body: JSON.stringify({ jsonrpc: '2.0', id: id, method: method, params: params || {} })
    });
    if (!res.ok) throw new Error('/mcp ' + method + ' -> HTTP ' + res.status + ' ' + (await res.text()).slice(0, 200));
    var ct = res.headers.get('content-type') || '';
    var text = await res.text();
    var msg = null;
    if (ct.indexOf('text/event-stream') >= 0) {
      text.split('\\n').forEach(function (line) {
        if (line.indexOf('data:') === 0) {
          try { var m = JSON.parse(line.slice(5).trim()); if (m.id === id) msg = m; } catch (e) {}
        }
      });
    } else {
      msg = JSON.parse(text);
    }
    if (!msg) throw new Error('no JSON-RPC response for ' + method);
    if (msg.error) throw new Error(method + ' error: ' + msg.error.message);
    return msg.result;
  }

  function send(msg) { iframe.contentWindow.postMessage(msg, '*'); }
  function reply(id, result) { send({ jsonrpc: '2.0', id: id, result: result }); }
  function replyError(id, message) { send({ jsonrpc: '2.0', id: id, error: { code: -32000, message: message } }); }

  window.addEventListener('message', async function (ev) {
    if (ev.source !== iframe.contentWindow) return;
    var msg = ev.data;
    if (!msg || msg.jsonrpc !== '2.0' || !msg.method) return;
    if (msg.method !== 'ui/notifications/size-changed') log('<- ' + msg.method, msg.params);
    switch (msg.method) {
      case 'ui/initialize':
        reply(msg.id, {
          protocolVersion: '2026-01-26',
          hostInfo: { name: 'freee-mcp-dev-harness', version: '1' },
          hostCapabilities: { updateModelContext: {}, message: {}, openLinks: {} },
          hostContext: { theme: 'light', displayMode: 'inline', platform: 'web', locale: 'ja-JP' }
        });
        break;
      case 'ui/notifications/initialized':
        send({ jsonrpc: '2.0', method: 'ui/notifications/tool-input', params: { arguments: {} } });
        send({ jsonrpc: '2.0', method: 'ui/notifications/tool-result', params: uiToolResult });
        log('-> ui/notifications/tool-result', uiToolResult.structuredContent);
        break;
      case 'ui/notifications/size-changed':
        if (msg.params && msg.params.height) iframe.style.height = (msg.params.height + 4) + 'px';
        break;
      case 'tools/call':
        try {
          var result = await mcp('tools/call', msg.params);
          var safe = JSON.parse(JSON.stringify(result));
          if (safe.structuredContent && safe.structuredContent.ticket) safe.structuredContent.ticket = '(redacted)';
          log('   tools/call ' + msg.params.name + ' result', safe);
          reply(msg.id, result);
        } catch (e) { log('   tools/call failed: ' + e.message); replyError(msg.id, e.message); }
        break;
      case 'ui/open-link':
        window.open(msg.params.url, '_blank');
        reply(msg.id, {});
        break;
      case 'ui/update-model-context':
        $('ctx').textContent += (msg.params.content || []).map(function (c) { return c.text; }).join('\\n') + '\\n---\\n';
        reply(msg.id, {});
        break;
      case 'ui/message':
        $('ctx').textContent += '[ui/message] ' + JSON.stringify(msg.params) + '\\n';
        reply(msg.id, {});
        break;
      default:
        if (msg.id !== undefined) reply(msg.id, {});
    }
  });

  $('load').addEventListener('click', async function () {
    $('status').textContent = 'loading...'; $('status').className = '';
    $('log').textContent = ''; $('ctx').textContent = '';
    try {
      var read = await mcp('resources/read', { uri: RESOURCE_URI });
      var html = read.contents[0].text;
      log('resources/read ok', { mimeType: read.contents[0].mimeType, bytes: html.length, _meta: read.contents[0]._meta });
      uiToolResult = await mcp('tools/call', { name: UI_TOOL, arguments: {} });
      log('tools/call ' + UI_TOOL + ' ok', uiToolResult.structuredContent);
      iframe.srcdoc = html;
      $('status').textContent = 'UI loaded (ticket tool: ' + TICKET_TOOL + ')';
    } catch (e) {
      $('status').textContent = e.message; $('status').className = 'err';
    }
  });
})();
</script>
</body>
</html>
`;

export function createDevUploadHarnessHandler(): RequestHandler {
  return (_req: Request, res: Response) => {
    res.setHeader('Content-Security-Policy', HARNESS_CSP);
    res.setHeader('Cache-Control', 'no-store');
    res.type('html').send(HARNESS_HTML);
  };
}
