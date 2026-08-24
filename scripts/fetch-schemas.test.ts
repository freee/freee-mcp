import { describe, expect, it } from 'vitest';
import { minimizeSchema, type OpenAPISchema } from './fetch-schemas';

describe('fetch-schemas minimization', () => {
  it('resolves parameter and schema references while preserving serialization metadata', () => {
    const schema: OpenAPISchema = {
      paths: {
        '/items': {
          get: {
            parameters: [
              { $ref: '#/components/parameters/idx' },
              {
                name: 'tags',
                in: 'query',
                schema: { type: 'array' },
              },
            ],
          },
        },
      },
      components: {
        parameters: {
          idx: {
            name: 'ids',
            in: 'query',
            schema: {
              allOf: [{ $ref: '#/components/schemas/idx' }],
            },
            style: 'form',
            explode: false,
          },
        },
        schemas: {
          idx: { type: 'array' },
        },
      },
    };

    expect(minimizeSchema(schema).paths['/items']?.get?.parameters).toEqual([
      {
        name: 'ids',
        in: 'query',
        type: 'array',
        style: 'form',
        explode: false,
      },
      {
        name: 'tags',
        in: 'query',
        type: 'array',
      },
    ]);
  });

  it('merges path-level parameters and lets operation parameters override them', () => {
    const schema: OpenAPISchema = {
      paths: {
        '/items/{id}': {
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'integer' },
            },
            {
              name: 'filter',
              in: 'query',
              schema: { type: 'string' },
            },
          ],
          get: {
            parameters: [
              {
                name: 'filter',
                in: 'query',
                schema: { type: 'array' },
                explode: true,
              },
            ],
          },
        },
      },
    };

    expect(minimizeSchema(schema).paths['/items/{id}']?.get?.parameters).toEqual([
      {
        name: 'id',
        in: 'path',
        type: 'integer',
        required: true,
      },
      {
        name: 'filter',
        in: 'query',
        type: 'array',
        explode: true,
      },
    ]);
  });
});
