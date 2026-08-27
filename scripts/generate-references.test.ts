import { describe, expect, it } from "vitest";
import {
  buildEndpointsMarkdown,
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

  it("異なる型を持つ union はスカラー型として出力しない", () => {
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

    expect(md).toContain("- value: object");
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
