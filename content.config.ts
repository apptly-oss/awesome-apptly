import { defineCollection, defineContentConfig } from '@nuxt/content';
import path from 'node:path';

const resolve = (s: string) => path.resolve(import.meta.dirname, s);

export default defineContentConfig({
  collections: {
    projects: defineCollection({
      type: 'page',
      source: {
        cwd: resolve('content'),
        include: 'projects/*.md',
      },
    }),
  },
});
