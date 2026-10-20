---
"freee-mcp": patch
---

リモート版の CIMD (Client ID Metadata Document) 取得で、client_id の URL が名前解決した先のアドレスも検査し、private / link-local / metadata などへの SSRF を防ぐ
