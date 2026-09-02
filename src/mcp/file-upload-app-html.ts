import { VIBES_CSS } from './vibes-css.js';

/**
 * HTML for the MCP Apps upload view (`ui://freee-mcp/file-upload`).
 *
 * Self-contained on purpose: no external scripts or styles, so it renders
 * under the host's default sandbox CSP (`script-src 'self' 'unsafe-inline'`).
 * The only network access is `fetch`/XHR to the upload endpoint, whose origin
 * is declared through `_meta.ui.csp.connectDomains` on the resource.
 *
 * Host bridge: a minimal implementation of the MCP Apps JSON-RPC-over-
 * postMessage protocol (2026-01-26): `ui/initialize` handshake, the
 * `ui/notifications/tool-result` that carries the upload target from
 * `freee_file_upload_ui`, a `tools/call` of `freee_file_upload_ticket` to
 * obtain the short-lived ticket, and `ui/update-model-context` to report the
 * uploaded receipt ids back to the conversation, followed by a `ui/message`
 * so the host actually continues instead of waiting for the user.
 *
 * Keep this file free of backticks and "${" so it stays a plain template
 * literal.
 */
export const FILE_UPLOAD_APP_HTML =
  `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>freee ファイルボックス アップロード</title>
<style>
` +
  // Real freee Vibes rules for the vb-* classes this view uses, inlined because
  // the host CSP allows no external stylesheet. Regenerate with
  // `bun run generate:vibes-css` after a Vibes upgrade.
  VIBES_CSS +
  `
  /* Layout and states Vibes does not cover: the grid, the upload queue, and a
     dark theme (Vibes ships light only) for hosts that request one. */
  :root {
    --vb-p5: #2864f0;
    --vb-p7: #285ac8;
    --vb-re5: #dc1e32;
    --vb-gy7: #323232;
    --vb-s9: #6e6b6b;
    --vb-s1: #f7f5f5;
    --vb-border: #dcdcdc;
    --bg: #ffffff;
    --fg: var(--vb-gy7);
    --muted: var(--vb-s9);
    --border: var(--vb-border);
    --accent: var(--vb-p7);
    --ok: var(--vb-p5);
    --err: var(--vb-re5);
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    padding: 1rem;
    font-family: "-apple-system", BlinkMacSystemFont, "Helvetica Neue", "ヒラギノ角ゴ ProN",
      "Hiragino Kaku Gothic ProN", Arial, "メイリオ", Meiryo, sans-serif;
    font-size: .875rem;
    line-height: 1.5;
    color: var(--fg);
    background: var(--bg);
  }
  h1 { margin: 0 0 .25rem; }
  .company { margin-bottom: .75rem; }
  .zone {
    padding: 1.5rem 1rem;
    text-align: center;
    cursor: pointer;
    border: 1px dashed var(--border);
    transition: background-color .2s, border-color .2s;
  }
  .zone:hover { border-color: var(--accent); }
  .zone.over { border: 2px dashed var(--vb-p5); background: rgba(40, 100, 240, .1); }
  .zone p { margin: .25rem 0; }
  input[type=file] { display: none; }
  .meta { display: grid; grid-template-columns: 1fr 1fr; gap: .5rem; margin-top: .75rem; }
  .meta label { display: flex; flex-direction: column; gap: .125rem; }
  .meta input, .meta select { width: 100%; }
  /* Vibes draws the select chevron in a wrapper element this plain-HTML view
     has no equivalent of, and .vb-select__body removes the native one. */
  .meta select {
    appearance: none;
    -webkit-appearance: none;
    padding-right: 1.75rem;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath d='M1 1.5 6 6.5 11 1.5' fill='none' stroke='%23323232' stroke-width='1.5'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right .625rem center;
    background-size: .75rem;
  }
  body.dark .meta select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath d='M1 1.5 6 6.5 11 1.5' fill='none' stroke='%23e5e7eb' stroke-width='1.5'/%3E%3C/svg%3E");
  }
  .meta .wide { grid-column: 1 / -1; }
  .files { list-style: none; padding: 0; margin: .75rem 0 0; }
  .files li {
    display: grid; grid-template-columns: 1fr auto; gap: .25rem .5rem; align-items: center;
    padding: .5rem 0; border-top: 1px solid var(--border);
  }
  .files .name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .files .bar { grid-column: 1 / -1; height: .25rem; background: var(--border); border-radius: .125rem; overflow: hidden; }
  .files .bar span { display: block; height: 100%; width: 0; background: var(--vb-p5); transition: width .15s; }
  /* Caption-sized text; the JS rewrites these classNames per state, so the
     size cannot ride on .vb-note. */
  .files .size, .files .status, .msg { font-size: .75rem; color: var(--muted); }
  .files .status { grid-column: 1 / -1; }
  .files .status.ok { color: var(--ok); }
  .files .status.err { color: var(--err); white-space: pre-wrap; }
  .actions { display: flex; gap: .5rem; align-items: center; margin-top: 1rem; }
  button:disabled { opacity: .5; cursor: not-allowed; }
  .msg.err { color: var(--err); white-space: pre-wrap; }
  body.dark {
    --bg: #1c1f24; --fg: #e5e7eb; --muted: #a6a2a2; --border: #3a3f47;
    --accent: #6ea0ff; --ok: #6ea0ff; --err: #ff8494;
  }
  body.dark .vb-sectionTitle { color: var(--fg); }
  body.dark .vb-note, body.dark .vb-formControlLabel__text { color: var(--muted); }
  body.dark .vb-fileUploader { background-color: #24282f; }
  body.dark .vb-textField, body.dark .vb-select__body {
    background-color: var(--bg); color: var(--fg); border-color: var(--border);
  }
  body.dark .vb-button--appearanceSecondary {
    background-color: var(--bg); color: var(--fg); border-color: var(--border);
  }
  body.dark .vb-button--appearancePrimary { background-color: var(--accent); color: #0b1a3a; }
  body.dark .vb-inlineLink { color: var(--accent); }
</style>
</head>
<body>
  <h1 class="vb-sectionTitle">ファイルボックスにアップロード</h1>
  <div class="company vb-note" id="company">接続中...</div>

  <div class="zone vb-fileUploader vb-fileUploader--widthFull" id="zone">
    <p>ここにファイルをドロップ、またはクリックして選択</p>
    <p class="hint vb-note" id="hint">PDF / 画像 など、1 ファイル 64MB まで。複数選択可</p>
    <input type="file" id="file" multiple>
  </div>

  <div class="meta">
    <label><span class="vb-formControlLabel__text">書類の種類</span>
      <select class="vb-select__body" id="document_type">
        <option value="">未指定</option>
        <option value="receipt">領収書</option>
        <option value="invoice">請求書</option>
        <option value="other">その他</option>
      </select>
    </label>
    <label><span class="vb-formControlLabel__text">適格請求書</span>
      <select class="vb-select__body" id="qualified_invoice">
        <option value="">未指定</option>
        <option value="qualified">適格</option>
        <option value="not_qualified">非適格</option>
        <option value="unselected">未選択</option>
      </select>
    </label>
    <label><span class="vb-formControlLabel__text">取引先名</span><input class="vb-textField" id="receipt_metadatum_partner_name" maxlength="255"></label>
    <label><span class="vb-formControlLabel__text">発行日</span><input class="vb-textField" id="receipt_metadatum_issue_date" type="date"></label>
    <label><span class="vb-formControlLabel__text">金額</span><input class="vb-textField" id="receipt_metadatum_amount" type="number" inputmode="numeric" step="1"></label>
    <label class="wide"><span class="vb-formControlLabel__text">メモ</span><input class="vb-textField" id="description" maxlength="255"></label>
  </div>

  <ul class="files" id="files"></ul>

  <div class="actions">
    <button class="vb-button vb-button--appearancePrimary" id="upload" disabled>アップロード</button>
    <button class="vb-button vb-button--appearanceSecondary" id="clear" disabled>クリア</button>
    <span class="msg" id="msg"></span>
  </div>

<script>
(function () {
  'use strict';
  var PROTOCOL_VERSION = '2026-01-26';
  var TICKET_TOOL = 'freee_file_upload_ticket';
  var TICKET_REFRESH_MARGIN_SEC = 60;
  var WEB_RECEIPT_URL = 'https://secure.freee.co.jp/receipts/';

  var $ = function (id) { return document.getElementById(id); };
  var els = {
    company: $('company'), zone: $('zone'), file: $('file'), hint: $('hint'),
    files: $('files'), upload: $('upload'), clear: $('clear'), msg: $('msg')
  };
  var META_FIELDS = ['document_type', 'qualified_invoice', 'receipt_metadatum_partner_name',
    'receipt_metadatum_issue_date', 'receipt_metadatum_amount', 'description'];

  // ---- host bridge (JSON-RPC over postMessage) ----
  var nextId = 1;
  var pending = {};
  var hostCapabilities = {};  // from the ui/initialize result
  var uploadInfo = null;   // from freee_file_upload_ui structuredContent
  var ticketInfo = null;   // from freee_file_upload_ticket structuredContent
  var ticketPromise = null;

  function post(msg) { window.parent.postMessage(msg, '*'); }
  function request(method, params) {
    return new Promise(function (resolve, reject) {
      var id = nextId++;
      pending[id] = { resolve: resolve, reject: reject };
      post({ jsonrpc: '2.0', id: id, method: method, params: params || {} });
    });
  }
  function notify(method, params) { post({ jsonrpc: '2.0', method: method, params: params || {} }); }

  window.addEventListener('message', function (ev) {
    var msg = ev.data;
    if (!msg || msg.jsonrpc !== '2.0') return;
    if (msg.id !== undefined && msg.method === undefined) {
      var p = pending[msg.id];
      if (!p) return;
      delete pending[msg.id];
      if (msg.error) p.reject(new Error(msg.error.message || 'host error'));
      else p.resolve(msg.result);
      return;
    }
    if (msg.method === 'ui/notifications/tool-result') {
      onToolResult(msg.params || {});
    } else if (msg.method === 'ui/notifications/host-context-changed') {
      applyHostContext(msg.params || {});
    }
    if (msg.id !== undefined) {
      // Host -> app request (e.g. ui/resource-teardown): acknowledge.
      post({ jsonrpc: '2.0', id: msg.id, result: {} });
    }
  });

  function applyHostContext(ctx) {
    if (ctx.theme) document.body.classList.toggle('dark', ctx.theme === 'dark');
    var fonts = ctx.styles && ctx.styles.css && ctx.styles.css.fonts;
    if (fonts && !document.getElementById('host-fonts')) {
      var style = document.createElement('style');
      style.id = 'host-fonts';
      style.textContent = fonts;
      document.head.appendChild(style);
    }
  }

  function reportSize() {
    notify('ui/notifications/size-changed', { height: document.documentElement.scrollHeight });
  }
  if (window.ResizeObserver) {
    new ResizeObserver(function () { window.requestAnimationFrame(reportSize); }).observe(document.body);
  }

  request('ui/initialize', {
    appInfo: { name: 'freee-mcp-file-upload', version: '1' },
    appCapabilities: {},
    protocolVersion: PROTOCOL_VERSION
  }).then(function (result) {
    hostCapabilities = (result && result.hostCapabilities) || {};
    applyHostContext((result && result.hostContext) || {});
    notify('ui/notifications/initialized', {});
    reportSize();
  }).catch(function (err) {
    setMsg('ホストとの接続に失敗しました: ' + err.message, true);
  });

  function onToolResult(params) {
    var sc = params.structuredContent;
    if (!sc || !sc.upload_url) {
      if (params.isError) setMsg(textOf(params.content) || 'ツールがエラーを返しました', true);
      return;
    }
    uploadInfo = sc;
    els.company.textContent = '事業所: ' + (sc.company_name || '') + ' (ID: ' + sc.company_id + ')';
    els.hint.textContent = 'PDF / 画像 など、1 ファイル ' + mb(sc.max_file_size_bytes) + ' まで。複数選択可';
    fetchTicket().then(function () { setMsg(''); refreshButtons(); });
  }

  function textOf(content) {
    if (!content) return '';
    return content.filter(function (c) { return c && c.type === 'text'; })
      .map(function (c) { return c.text; }).join('\\n');
  }

  function fetchTicket() {
    if (ticketPromise) return ticketPromise;
    setMsg('アップロード準備中...');
    ticketPromise = request('tools/call', { name: TICKET_TOOL, arguments: {} }).then(function (result) {
      ticketPromise = null;
      if (!result || result.isError || !result.structuredContent || !result.structuredContent.ticket) {
        throw new Error(textOf(result && result.content) || 'チケットを取得できませんでした');
      }
      ticketInfo = result.structuredContent;
      return ticketInfo;
    }).catch(function (err) {
      ticketPromise = null;
      setMsg('アップロードの準備に失敗しました: ' + err.message, true);
      throw err;
    });
    return ticketPromise;
  }

  function ensureTicket() {
    var now = Math.floor(Date.now() / 1000);
    if (ticketInfo && ticketInfo.expires_at - now > TICKET_REFRESH_MARGIN_SEC) {
      return Promise.resolve(ticketInfo);
    }
    ticketInfo = null;
    return fetchTicket();
  }

  // ---- file selection ----
  var queue = []; // { file, li, bar, status, done, receiptId, error }

  function mb(bytes) { return (bytes / (1024 * 1024)).toFixed(bytes >= 10 * 1024 * 1024 ? 0 : 1) + 'MB'; }
  function setMsg(text, isError) {
    els.msg.textContent = text || '';
    els.msg.className = 'msg' + (isError ? ' err' : '');
    reportSize();
  }
  function refreshButtons() {
    var uploading = queue.some(function (q) { return q.uploading; });
    var hasPending = queue.some(function (q) { return !q.done && !q.error; });
    els.upload.disabled = uploading || !hasPending || !ticketInfo;
    els.clear.disabled = uploading || queue.length === 0;
  }

  function addFiles(list) {
    var max = (uploadInfo && uploadInfo.max_file_size_bytes) || 64 * 1024 * 1024;
    Array.prototype.forEach.call(list, function (file) {
      var li = document.createElement('li');
      var name = document.createElement('span'); name.className = 'name'; name.textContent = file.name;
      var size = document.createElement('span'); size.className = 'size'; size.textContent = mb(file.size);
      var bar = document.createElement('div'); bar.className = 'bar'; var fill = document.createElement('span'); bar.appendChild(fill);
      var status = document.createElement('div'); status.className = 'status';
      li.appendChild(name); li.appendChild(size); li.appendChild(bar); li.appendChild(status);
      els.files.appendChild(li);
      var entry = { file: file, li: li, fill: fill, status: status, done: false, error: null, uploading: false };
      if (file.size > max) {
        entry.error = 'ファイルサイズが上限(' + mb(max) + ')を超えています';
        status.textContent = entry.error; status.className = 'status err';
      } else {
        status.textContent = '待機中';
      }
      queue.push(entry);
    });
    refreshButtons();
    reportSize();
  }

  els.zone.addEventListener('click', function () { els.file.click(); });
  els.file.addEventListener('change', function () { addFiles(els.file.files); els.file.value = ''; });
  ['dragenter', 'dragover'].forEach(function (t) {
    els.zone.addEventListener(t, function (e) { e.preventDefault(); els.zone.classList.add('over'); });
  });
  ['dragleave', 'drop'].forEach(function (t) {
    els.zone.addEventListener(t, function (e) { e.preventDefault(); els.zone.classList.remove('over'); });
  });
  els.zone.addEventListener('drop', function (e) {
    if (e.dataTransfer && e.dataTransfer.files) addFiles(e.dataTransfer.files);
  });
  els.clear.addEventListener('click', function () {
    queue = []; els.files.textContent = ''; setMsg(''); refreshButtons();
  });

  // ---- upload ----
  // A context update does not start a turn, so the host waits for the user to
  // say the upload finished. Post a short message instead when the host
  // supports it (MCP Apps: ui/message), and only after something succeeded.
  function continueConversation(okCount) {
    if (!okCount || !hostCapabilities.message) return;
    return request('ui/message', {
      role: 'user',
      content: [{ type: 'text', text: 'ファイルボックスへのアップロードが完了しました。続きの作業を進めてください。' }]
    }).catch(function () { /* host declined the message: leave it to the user */ });
  }

  function metaValues() {
    var out = {};
    META_FIELDS.forEach(function (id) {
      var v = $(id).value;
      if (v !== '') out[id] = v;
    });
    return out;
  }

  function metaForm() {
    var fd = new FormData();
    var values = metaValues();
    Object.keys(values).forEach(function (id) { fd.append(id, values[id]); });
    return fd;
  }

  function uploadOne(entry, retried) {
    return ensureTicket().then(function (ticket) {
      return new Promise(function (resolve, reject) {
        var fd = metaForm();
        fd.append('receipt', entry.file, entry.file.name);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', ticket.upload_url);
        xhr.setRequestHeader('Authorization', 'Bearer ' + ticket.ticket);
        xhr.upload.onprogress = function (e) {
          if (e.lengthComputable) entry.fill.style.width = Math.round(e.loaded / e.total * 100) + '%';
        };
        xhr.onerror = function () { reject(new Error('ネットワークエラーが発生しました')); };
        xhr.ontimeout = function () { reject(new Error('タイムアウトしました')); };
        xhr.onload = function () {
          var body = null;
          try { body = JSON.parse(xhr.responseText); } catch (e) { body = null; }
          if (xhr.status >= 200 && xhr.status < 300) { resolve(body); return; }
          var err = new Error((body && body.message) || ('HTTP ' + xhr.status));
          err.status = xhr.status;
          err.code = body && body.error;
          reject(err);
        };
        xhr.send(fd);
      });
    }).catch(function (err) {
      // Ticket expired between issue and use: refresh once and retry.
      if (!retried && err.status === 401 && err.code === 'invalid_ticket') {
        ticketInfo = null;
        return uploadOne(entry, true);
      }
      throw err;
    });
  }

  function receiptIdOf(body) {
    var r = body && (body.receipt || body);
    return r && r.id !== undefined ? String(r.id) : '';
  }

  els.upload.addEventListener('click', function () {
    var targets = queue.filter(function (q) { return !q.done && !q.error; });
    if (targets.length === 0) return;
    setMsg('アップロード中...');
    var results = [];
    var chain = Promise.resolve();
    targets.forEach(function (entry) {
      chain = chain.then(function () {
        entry.uploading = true; refreshButtons();
        entry.status.textContent = 'アップロード中...'; entry.status.className = 'status';
        return uploadOne(entry, false).then(function (body) {
          entry.uploading = false; entry.done = true; entry.fill.style.width = '100%';
          entry.receiptId = receiptIdOf(body);
          entry.status.textContent = '';
          entry.status.className = 'status ok';
          entry.status.appendChild(document.createTextNode('アップロード完了 (ID: ' + entry.receiptId + ') '));
          if (entry.receiptId) {
            var a = document.createElement('a');
            a.href = WEB_RECEIPT_URL + entry.receiptId; a.className = 'vb-inlineLink'; a.textContent = 'freee で開く';
            a.addEventListener('click', function (e) {
              e.preventDefault();
              request('ui/open-link', { url: a.href }).catch(function () { window.open(a.href, '_blank'); });
            });
            entry.status.appendChild(a);
          }
          results.push({ name: entry.file.name, id: entry.receiptId, ok: true });
        }, function (err) {
          entry.uploading = false; entry.error = err.message;
          entry.status.textContent = '失敗: ' + err.message; entry.status.className = 'status err';
          results.push({ name: entry.file.name, error: err.message, ok: false });
        });
      });
    });
    chain.then(function () {
      var okCount = results.filter(function (r) { return r.ok; }).length;
      setMsg(okCount + ' / ' + results.length + ' 件のアップロードが完了しました', okCount !== results.length);
      refreshButtons();
      var lines = results.map(function (r) {
        return r.ok
          ? '- ' + r.name + ': アップロード成功 (ファイルボックスID: ' + r.id + ')'
          : '- ' + r.name + ': 失敗 (' + r.error + ')';
      });
      // The metadata typed into the screen is sent to freee with the file, but
      // OCR fills it in asynchronously, so report it here too: otherwise the
      // conversation has to ask the user for the issue date and amount again.
      var meta = metaValues();
      var metaKeys = Object.keys(meta);
      var text = 'ファイルボックスへのアップロード結果 (事業所ID: ' +
        (uploadInfo && uploadInfo.company_id) + '):\\n' + lines.join('\\n');
      if (metaKeys.length) {
        text += '\\n画面で入力された情報:\\n' + metaKeys.map(function (k) {
          return '- ' + k + ': ' + meta[k];
        }).join('\\n');
      }
      request('ui/update-model-context', {
        content: [{ type: 'text', text: text }],
        structuredContent: {
          company_id: uploadInfo && uploadInfo.company_id, results: results, metadata: meta
        }
      }).catch(function () { /* host without model-context support: ignore */ })
        .then(function () { return continueConversation(okCount); });
    });
  });
})();
</script>
</body>
</html>
`;
