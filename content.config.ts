import { defineCollection, defineContentConfig, z } from '@nuxt/content';
import { readdirSync } from 'node:fs';
import path from 'node:path';

const resolve = (s: string) => path.resolve(import.meta.dirname, s);

const categories = readdirSync(resolve('content/categories'))
  .filter((f) => f.endsWith('.md'))
  .toSorted()
  .map((f) => f.replace('.md', '')) as [string, ...string[]];

const languages = ['Go', 'TypeScript'] as const;

export default defineContentConfig({
  collections: {
    categories: defineCollection({
      type: 'page',
      source: {
        cwd: resolve('content'),
        include: 'categories/*.md',
      },
      schema: z.object({
        org: z.string().optional(),
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
        language: z.array(z.enum(languages)),
      }),
    }),
  },
});
