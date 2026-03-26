import { defineCollection, defineContentConfig, z } from '@nuxt/content';
import path from 'node:path';

const resolve = (s: string) => path.resolve(import.meta.dirname, s);

const categories = [
  'darvaza', 'kagal', 'poupe',
  'infrastructure', 'networking', 'security', 'tooling', 'ui',
] as const;

const languages = ['Go', 'TypeScript'] as const;

export default defineContentConfig({
  collections: {
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
