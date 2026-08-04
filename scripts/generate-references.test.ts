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
