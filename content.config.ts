import { defineCollection, defineContentConfig, z } from '@nuxt/content';
import { readdirSync } from 'node:fs';
import path from 'node:path';

const resolve = (s: string) => path.resolve(import.meta.dirname, s);

const categories = readdirSync(resolve('content/categories'))
  .filter((f) => f.endsWith('.md'))
  .toSorted()
  .map((f) => f.replace('.md', '')) as [string, ...string[]];

export default defineContentConfig({
  collections: {
    categories: defineCollection({
      type: 'page',
      source: {
        cwd: resolve('content'),
        include: 'categories/*.md',
      },
      schema: z.object({
        kind: z.enum(['umbrella', 'language']).optional(),
      }),
    }),
    projects: defineCollection({
      type: 'page',
      source: {
        cwd: resolve('content'),
        include: 'projects/*.md',
      },
      schema: z.object({
        category: z.array(z.enum(categories)),
        repo: z.string().optional(),
        licence: z.string().optional(),
        npm: z.string().optional(),
        go: z.string().optional(),
      }),
    }),
  },
});
