---
"freee-mcp": patch
---

リモート版の CIMD (Client ID Metadata Document) 取得で、client_id の URL が名前解決した先のアドレスも検査し、検査したアドレスにだけ接続することで private / link-local / metadata などへの SSRF (DNS rebinding を含む) を防ぐ
