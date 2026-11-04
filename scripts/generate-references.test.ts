import { describe, expect, it } from "vitest";
import {
  buildEndpointsMarkdown,
  countOperations,
  findServicesMissingFromIndex,
  replaceOperationCount,
  type OpenAPISchema,
  type PathData,
} from "./generate-references";

/**
 * `POST /tags` と `PUT /tags/{id}` が同じ `tagParams` を共有しつつ、
 * body 自体の必須性だけが異なる実際のスキーマ（accounting）を模したもの。
 */
const schema: OpenAPISchema = {
  paths: {},
  components: {
    schemas: {
      tagParams: {
        type: "object",
        required: ["company_id", "name"],
        properties: {
          company_id: { type: "integer", description: "事業所ID" },
          name: { type: "string", description: "メモタグ名" },
        },
      },
    },
  },
};

function endpointsWithBodyRequired(
  ...required: Array<boolean | undefined>
): PathData[] {
  return required.map((value, index) => ({
    path: index === 0 ? "/tags" : "/tags/{id}",
    operations: [
      {
        method: index === 0 ? "POST" : "PUT",
        requestBody: {
          required: value,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/tagParams" },
            },
          },
        },
      },
    ],
  }));
}

describe("buildEndpointsMarkdown", () => {
  it("requestBody.required: true を見出しの * で示す", () => {
    const md = buildEndpointsMarkdown(schema, endpointsWithBodyRequired(true));

    expect(md).toContain("### リクエストボディ*");
    expect(md).toContain("- company_id*: integer - 事業所ID");
  });

  it("requestBody.required が false / 未指定なら * を付けない", () => {
    for (const value of [false, undefined]) {
      const md = buildEndpointsMarkdown(schema, endpointsWithBodyRequired(value));

      expect(md).toContain("### リクエストボディ");
      expect(md).not.toContain("### リクエストボディ*");
    }
  });

  it("同じ schema でも required が異なれば重複排除で潰さない", () => {
    // POST /tags は required: true、PUT /tags/{id} は false。
    // body の中身は同一だが、body 自体の必須性が違うので両方出す必要がある。
    const md = buildEndpointsMarkdown(
      schema,
      endpointsWithBodyRequired(true, false)
    );

    expect(md).toContain("### リクエストボディ*");
    expect(md).toContain("### リクエストボディ\n\n- company_id*");
    expect(md).not.toContain("POST /tags と同じ");
  });

  it("required も本文も同一なら初出への参照に置き換える", () => {
    const md = buildEndpointsMarkdown(
      schema,
      endpointsWithBodyRequired(true, true)
    );

    expect(md).toContain("### リクエストボディ*\n\nPOST /tags と同じ");
  });
});

/**
 * 販売管理 API のように requestBody を components.requestBodies に切り出し、
 * 共通項目を `allOf` で合成しているスキーマを模したもの。
 */
const composedSchema: OpenAPISchema = {
  paths: {},
  components: {
    schemas: {
      WithCompanyId: {
        type: "object",
        required: ["company_id"],
        properties: {
          company_id: { type: "integer", description: "事業所ID", minimum: 1 },
        },
      },
      BusinessRequestBase: {
        type: "object",
        properties: {
          name: { type: "string", description: "案件名称" },
          code: { type: "string", description: "案件コード" },
        },
      },
      UserId: { type: "integer", format: "int64", example: 1 },
    },
    requestBodies: {
      BusinessCreateRequest: {
        required: true,
        content: {
          "application/json": {
            schema: {
              allOf: [
                { $ref: "#/components/schemas/WithCompanyId" },
                { $ref: "#/components/schemas/BusinessRequestBase" },
                { type: "object", required: ["name"] },
              ],
            },
          },
        },
      },
    },
  },
};

const composedEndpoints: PathData[] = [
  {
    path: "/businesses",
    operations: [
      {
        method: "POST",
        requestBody: { $ref: "#/components/requestBodies/BusinessCreateRequest" },
      },
    ],
  },
];

describe("buildEndpointsMarkdown - $ref / allOf の解決", () => {
  it("components.requestBodies への $ref を解決して本文を出力する", () => {
    const md = buildEndpointsMarkdown(composedSchema, composedEndpoints);

    // 解決前は content が読めず、セクションごと欠落していた
    expect(md).toContain("### リクエストボディ*");
    expect(md).toContain("- name*: string - 案件名称");
  });

  it("複数要素の allOf を合成し、required は和集合を取る", () => {
    const md = buildEndpointsMarkdown(composedSchema, composedEndpoints);

    // company_id は 1 つ目、name は 3 つ目のメンバーで required 指定されている
    expect(md).toContain("- company_id*: integer - 事業所ID");
    expect(md).toContain("- name*: string - 案件名称");
    expect(md).toContain("- code: string - 案件コード");
  });

  it("allOf の合成で制約・例・format を落とさない", () => {
    const md = buildEndpointsMarkdown(composedSchema, composedEndpoints);

    expect(md).toContain("(最小: 1)");
  });

  it("allOf ラッパーの description は参照先より優先する", () => {
    const md = buildEndpointsMarkdown(
      {
        paths: {},
        components: {
          schemas: composedSchema.components?.schemas,
          requestBodies: {
            Body: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      executor_id: {
                        description: "退会処理を実行するユーザーのID",
                        allOf: [{ $ref: "#/components/schemas/UserId" }],
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      [
        {
          path: "/users",
          operations: [
            {
              method: "POST",
              requestBody: { $ref: "#/components/requestBodies/Body" },
            },
          ],
        },
      ]
    );

    expect(md).toContain(
      "- executor_id: integer(int64) - 退会処理を実行するユーザーのID 例: `1`"
    );
  });
});

/** GET path のレスポンスとして schema を出力したときの markdown を返す */
function responseMarkdown(apiSchema: OpenAPISchema, responseSchema: object): string {
  return buildEndpointsMarkdown(apiSchema, [
    {
      path: "/target",
      operations: [
        {
          method: "GET",
          responses: {
            "200": { content: { "application/json": { schema: responseSchema } } },
          },
        },
      ],
    },
  ]);
}

describe("buildEndpointsMarkdown - JSON Pointer 形式の $ref の解決", () => {
  it("#/paths/... への $ref（~1 エスケープ含む）を解決する", () => {
    // 工数管理 API は別エンドポイントのレスポンス schema を paths 経由で参照する
    const apiSchema: OpenAPISchema = {
      paths: {
        "/projects": {
          get: {
            responses: {
              "200": {
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        meta: {
                          type: "object",
                          description: "メタ情報",
                          properties: { total_count: { type: "integer" } },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    };

    const md = responseMarkdown(apiSchema, {
      type: "object",
      properties: {
        meta: {
          $ref: "#/paths/~1projects/get/responses/200/content/application~1json/schema/properties/meta",
        },
      },
    });

    // 未解決だと `- meta: object` だけになり説明も落ちる
    expect(md).toContain("- meta: object - メタ情報");
  });

  it("components.schemas 配下の深いポインタは参照先の要素に解決する", () => {
    const apiSchema: OpenAPISchema = {
      paths: {},
      components: {
        schemas: {
          WorkTimes: {
            type: "object",
            properties: {
              work_records: {
                type: "array",
                items: { type: "string", description: "勤務時間" },
              },
            },
          },
        },
      },
    };

    const md = responseMarkdown(apiSchema, {
      type: "object",
      properties: {
        record: {
          $ref: "#/components/schemas/WorkTimes/properties/work_records/items",
        },
      },
    });

    // 以前は `WorkTimes` 自体に解決され object として出力されていた
    expect(md).toContain("- record: string - 勤務時間");
  });

  it("components.responses への $ref を解決してレスポンスを出力する", () => {
    const apiSchema: OpenAPISchema = {
      paths: {},
      components: {
        schemas: {
          Business: {
            type: "object",
            properties: { name: { type: "string", description: "案件名称" } },
          },
        },
        responses: {
          BusinessResponse: {
            description: "案件",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Business" },
              },
            },
          },
        },
      },
    };

    const md = buildEndpointsMarkdown(apiSchema, [
      {
        path: "/businesses/{id}",
        operations: [
          {
            method: "GET",
            responses: { "200": { $ref: "#/components/responses/BusinessResponse" } },
          },
        ],
      },
    ]);

    // 販売管理 API の成功レスポンスの大半がこの形で、以前はセクションごと欠落していた
    expect(md).toContain("### レスポンス");
    expect(md).toContain("- name: string - 案件名称");
  });

  it("配列要素が $ref でも参照先の型で表示する", () => {
    const apiSchema: OpenAPISchema = {
      paths: {},
      components: {
        schemas: {
          DeliveryType: { type: "string", enum: ["email", "post"] },
        },
      },
    };

    const md = responseMarkdown(apiSchema, {
      type: "object",
      properties: {
        delivery_types: {
          type: "array",
          items: { $ref: "#/components/schemas/DeliveryType" },
        },
      },
    });

    expect(md).toContain("- delivery_types: array[string]");
  });
});

describe("buildEndpointsMarkdown - anyOf の解決", () => {
  it("同じスカラー型の union をその型として出力する", () => {
    const md = buildEndpointsMarkdown(
      {
        paths: {},
        components: {
          schemas: {
            Prefecture: { type: "string", enum: ["東京都"] },
            Response: {
              type: "object",
              required: ["workplace_prefecture"],
              properties: {
                workplace_prefecture: {
                  description: "仕事場所の都道府県",
                  anyOf: [
                    { $ref: "#/components/schemas/Prefecture" },
                    { type: "string", enum: [""] },
                  ],
                },
              },
            },
          },
        },
      },
      [
        {
          path: "/kaigyo_application",
          operations: [
            {
              method: "GET",
              responses: {
                "200": {
                  content: {
                    "application/json": {
                      schema: { $ref: "#/components/schemas/Response" },
                    },
                  },
                },
              },
            },
          ],
        },
      ]
    );

    expect(md).toContain(
      "- workplace_prefecture*: string - 仕事場所の都道府県"
    );
    expect(md).not.toContain("- workplace_prefecture*: object");
  });

  it("異なるスカラー型を持つ union は型を併記する", () => {
    const md = buildEndpointsMarkdown(
      {
        paths: {},
        components: {
          schemas: {
            Response: {
              type: "object",
              properties: {
                value: {
                  anyOf: [{ type: "string" }, { type: "integer" }],
                },
              },
            },
          },
        },
      },
      [
        {
          path: "/mixed-union",
          operations: [
            {
              method: "GET",
              responses: {
                "200": {
                  content: {
                    "application/json": {
                      schema: { $ref: "#/components/schemas/Response" },
                    },
                  },
                },
              },
            },
          ],
        },
      ]
    );

    expect(md).toContain("- value: string | integer");
  });
});

describe("buildEndpointsMarkdown - object の union の展開", () => {
  // 販売 API の明細行を模したもの: allOf で拡張した形と、テキスト行の形の oneOf
  const lineSchema: OpenAPISchema = {
    paths: {},
    components: {
      schemas: {
        BasicLine: {
          type: "object",
          required: ["line_no", "line_type", "quantity"],
          properties: {
            line_no: { type: "integer", description: "明細行番号" },
            line_type: { type: "string", enum: ["basic"], description: "明細行種別" },
            quantity: { type: "number", description: "数量" },
          },
        },
        SaleBasicLine: {
          allOf: [
            { $ref: "#/components/schemas/BasicLine" },
            {
              type: "object",
              required: ["account_item"],
              properties: { account_item: { type: "string", description: "勘定科目" } },
            },
          ],
        },
        TextLine: {
          type: "object",
          required: ["line_no", "line_type", "text"],
          properties: {
            line_no: { type: "integer", description: "明細行番号" },
            line_type: { type: "string", enum: ["text"], description: "明細行種別" },
            text: { type: "string", description: "テキスト" },
          },
        },
        Line: {
          description: "明細",
          discriminator: {
            propertyName: "line_type",
            mapping: {
              basic: "#/components/schemas/SaleBasicLine",
              text: "#/components/schemas/TextLine",
            },
          },
          oneOf: [
            { $ref: "#/components/schemas/SaleBasicLine" },
            { $ref: "#/components/schemas/TextLine" },
          ],
        },
      },
    },
  };

  function lineRequestBody(): string {
    return buildEndpointsMarkdown(lineSchema, [
      {
        path: "/sales",
        operations: [
          {
            method: "POST",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      lines: { type: "array", items: { $ref: "#/components/schemas/Line" } },
                    },
                  },
                },
              },
            },
          },
        ],
      },
    ]);
  }

  it("全形のプロパティを合成し、一部の形にしか無い項目に注記を付ける", () => {
    const md = lineRequestBody();

    expect(md).toContain("- line_no*: integer - 明細行番号\n");
    // allOf で拡張した形の項目も合成される
    expect(md).toContain("- account_item*: string - 勘定科目 （basic のみ）");
    expect(md).toContain("- text*: string - テキスト （text のみ）");
  });

  it("必須はその項目を持つすべての形で必須のときだけ付ける", () => {
    const md = buildEndpointsMarkdown(
      {
        paths: {},
        components: {
          schemas: {
            A: {
              type: "object",
              required: ["name"],
              properties: { name: { type: "string" } },
            },
            B: { type: "object", properties: { name: { type: "string" } } },
          },
        },
      },
      [
        {
          path: "/target",
          operations: [
            {
              method: "POST",
              requestBody: {
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        value: {
                          anyOf: [
                            { $ref: "#/components/schemas/A" },
                            { $ref: "#/components/schemas/B" },
                          ],
                        },
                      },
                    },
                  },
                },
              },
            },
          ],
        },
      ]
    );

    expect(md).toContain("- value: object （次のいずれかの形: A / B）");
    expect(md).toContain("- name: string\n");
  });

  it("discriminator プロパティの選択肢は全形の値をまとめる", () => {
    const md = lineRequestBody();

    expect(md).toContain("- line_type*: string - 明細行種別 (選択肢: basic, text)");
  });

  it("配列要素の union は深さ1のレスポンスでもプロパティ行に注記する", () => {
    const md = responseMarkdown(lineSchema, {
      type: "object",
      properties: {
        lines: { type: "array", items: { $ref: "#/components/schemas/Line" } },
      },
    });

    expect(md).toContain(
      "- lines: array[object] （要素は line_type により形が異なる: basic / text）"
    );
  });

  it("同じ schema を指す複数の mapping キーは1つの形のラベルにまとめる", () => {
    const md = responseMarkdown(
      {
        paths: {},
        components: {
          schemas: {
            Procurement: {
              type: "object",
              properties: {
                type: { type: "string" },
                supplier: { type: "string", description: "仕入先" },
              },
            },
            Basic: { type: "object", properties: { type: { type: "string" } } },
          },
        },
      },
      {
        type: "object",
        properties: {
          budget: {
            discriminator: {
              propertyName: "type",
              mapping: {
                procurement: "#/components/schemas/Procurement",
                external_procurement: "#/components/schemas/Basic",
                other_cost: "#/components/schemas/Basic",
              },
            },
            oneOf: [
              { $ref: "#/components/schemas/Procurement" },
              { $ref: "#/components/schemas/Basic" },
            ],
          },
        },
      }
    );

    expect(md).toContain(
      "- budget: object （type により形が異なる: procurement / external_procurement / other_cost）"
    );
  });

  it("リクエストボディ自体が union なら先頭に形の注記を出す", () => {
    const md = buildEndpointsMarkdown(lineSchema, [
      {
        path: "/lines",
        operations: [
          {
            method: "POST",
            requestBody: {
              content: {
                "application/json": { schema: { $ref: "#/components/schemas/Line" } },
              },
            },
          },
        ],
      },
    ]);

    expect(md).toContain(
      "### リクエストボディ\n\nline_type により形が異なる: basic / text\n- line_no*: integer"
    );
  });

  it("配列を含む union は平坦化しない", () => {
    const md = responseMarkdown(
      { paths: {} },
      {
        type: "object",
        properties: {
          children: { oneOf: [{ type: "array", items: { type: "string" } }, { type: "object" }] },
        },
      }
    );

    expect(md).toContain("- children: object\n");
  });
});

describe("buildEndpointsMarkdown - 法人税申告APIのレスポンス", () => {
  const responseSchema: OpenAPISchema = {
    paths: {},
    components: {
      schemas: {
        SheetResponse: {
          type: "object",
          properties: {
            data: {
              type: "object",
              properties: {
                tax_data: {
                  type: "object",
                  properties: {
                    sheet_key: { type: "string", description: "帳票キー" },
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  const responseEndpoints: PathData[] = [
    {
      path: "/hub/tax_return/corporate/sheet/national/{tax_return_id}/{sheet_key}",
      operations: [
        {
          method: "GET",
          responses: {
            "200": {
              description: "帳票データ",
              content: {
                "application/xml": {},
                "application/json": {
                  schema: { $ref: "#/components/schemas/SheetResponse" },
                },
              },
            },
          },
        },
      ],
    },
  ];

  it("通常APIはレスポンスをトップレベルだけに絞る", () => {
    const md = buildEndpointsMarkdown(responseSchema, responseEndpoints);

    expect(md).toContain("- data: object");
    expect(md).not.toContain("- tax_data: object");
    expect(md).not.toContain("- sheet_key: string");
  });

  it("法人税申告APIは帳票項目の対応に必要な3階層目まで出力する", () => {
    const md = buildEndpointsMarkdown(
      responseSchema,
      responseEndpoints,
      "tax-return-api"
    );

    expect(md).toContain("レスポンス形式: `application/xml`（推奨）");
    expect(md).toContain("- tax_data: object");
    expect(md).toContain("- sheet_key: string - 帳票キー");
  });
});

describe("countOperations", () => {
  it("パス × HTTP メソッドの数を数える", () => {
    const target: OpenAPISchema = {
      paths: {
        "/deals": { get: {}, post: {} },
        "/deals/{id}": { get: {}, put: {}, delete: {} },
        "/deals/{id}/renews": { patch: {} },
      },
    };

    expect(countOperations(target)).toBe(6);
  });

  it("HTTP メソッド以外のキーは数えない", () => {
    const target: OpenAPISchema = {
      paths: {
        // parameters はパス共通のパラメータ定義であって操作ではない
        "/deals": { get: {}, parameters: {}, servers: {} },
      },
    };

    expect(countOperations(target)).toBe(1);
  });

  it("paths が空でも 0 を返す", () => {
    expect(countOperations({ paths: {} })).toBe(0);
  });
});

describe("replaceOperationCount", () => {
  const readme = [
    "# freee-mcp",
    "",
    "- 対応操作数: <!-- API-STATS-TOTAL-START -->485<!-- API-STATS-TOTAL-END --> 操作",
    "",
  ].join("\n");

  it("マーカー間の数値だけを差し替える", () => {
    expect(replaceOperationCount(readme, 500)).toBe(
      readme.replace("485", "500")
    );
  });

  it("同じ数値なら入力と等しい文字列を返す", () => {
    expect(replaceOperationCount(readme, 485)).toBe(readme);
  });

  it("マーカーが無ければ null を返す", () => {
    expect(replaceOperationCount("# freee-mcp\n", 485)).toBeNull();
  });

  it("開始マーカーだけで終了マーカーが無ければ null を返す", () => {
    expect(
      replaceOperationCount("<!-- API-STATS-TOTAL-START -->485\n", 485)
    ).toBeNull();
  });
});

describe("API_CONFIGS と SERVICE_LABELS の整合", () => {
  it("索引対象の service がすべて SERVICE_LABELS に存在する", () => {
    expect(findServicesMissingFromIndex()).toEqual([]);
  });
});
