# Projects

## POST /projects — プロジェクトの登録

プロジェクトを登録することができます。

### リクエストボディ

- company_id*: integer(int32) - 事業所ID 例: `1`
- name*: string - プロジェクト名
- code: string - プロジェクトコード
  案件マスタの自動採番機能が利用可能な場合、指定は任意です。
- description: string - プロジェクト概要
- from_date*: string - プロジェクト開始日
- thru_date*: string - プロジェクト終了日
- publish_to_employee: boolean - 従業員への公開設定
  公開するとプロジェクト一覧に表示され、従業員がアサインリクエストを送れるようになります。（詳細画面は閲覧不可）
- assignment_url_enabled: boolean - プロジェクトの招待リンク機能設定
  プロジェクトの招待リンクを発行できるようにするかどうかを設定します。
- sales_order_status_id: integer(int32) - 受注ステータスID 例: `2`
- manager_person_id: integer(int32) - プロジェクトマネージャーの従業員ID
  このパラメータはシステム管理者かプロジェクトマネージャーでログインしているときのみ指定可能。
  （デフォルト：指定しない場合はログインユーザ） 例: `10`
- pm_budgets_cost*: integer(int32) - プロジェクトマネージャーのコスト(円) 例: `4000`
- color_id: integer(int32) - プロジェクトの色を指定可能（デフォルト：orange）
  { orange: 1, blue_green: 2, green: 3, blue: 4, purple: 5, red: 6, yellow: 7 } 例: `3`
- members: array[object] - アサインするユーザの配列
  配列の要素:
    - person_id*: integer(int32) - 従業員ID 例: `11`
    - unit_cost_id*: integer(int32) - このプロジェクトで使用する従業員単価マスタID
      `use_standard_unit_cost: true` の場合は無視されます 例: `3`
    - budgets_cost*: integer(int32) - 予算計算用の単価(円) 例: `2000`
    - use_standard_unit_cost: boolean - 標準の従業員単価マスタの単価を利用（デフォルト：false） 例: `true`
- orderer_ids: array[integer] - 発注元として指定する取引先IDの配列
- contractor_ids: array[integer] - 発注先として指定する取引先IDの配列
- workload_tag_groups: array[object] - プロジェクトに指定可能な工数タグリスト
  配列の要素:
    - tag_group_id*: integer - 工数タググループID 例: `1`
    - required*: boolean - 工数登録時の入力を必須とするか 例: `true`
    - tag_ids*: array[integer] - 当該タググループ配下で指定可能とする工数タグIDの配列（1件以上必要）
- common_business_id: string - 案件マスタの案件ID（ULID形式）
  指定した場合は既存案件にプロジェクトを紐付けます。指定しない場合は新規案件を作成します。 例: `01KF06JSKZ8TXZZVG7842F0VEM`

### レスポンス

- project*: object - プロジェクト

## GET /projects — プロジェクト一覧の取得

この事業所のプロジェクトの一覧情報を返します。 運用ステータス、マネージャー、発注先、発注元で絞り込みできます。

### パラメータ

- company_id*: integer - 事業所ID
- operational_status: string - 運用ステータス (選択肢: planning, awaiting_approval, in_progress, rejected, done)
- manager_ids[]: array[integer] - マネージャのユーザID
- orderer_ids[]: array[integer] - 発注元の取引先ID
- contractor_ids[]: array[integer] - 発注先の取引先ID
- limit: integer - 取得レコードの件数（デフォルト：50, 最小：1, 最大100）
- offset: integer - 取得レコードのオフセット（デフォルト：0）

### レスポンス

- meta*: object - ページネーションのメタ情報
- projects_counts*: object
- projects*: array[object]

## GET /projects/{id} — プロジェクト詳細の取得

IDに該当するプロジェクトの詳細情報を返します。

### パラメータ

- company_id*: integer - 事業所ID
- id* (path): integer - プロジェクトID

### レスポンス

- project*: object
