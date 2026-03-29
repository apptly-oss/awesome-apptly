// Build-time module: extracts icons from @iconify-json/simple-icons,
// converts them to white-fill base64 SVG data URIs, and exposes them
// to Nitro server handlers via #badge-logos.
//
// Usage in server handlers:
//   import { logos } from '#badge-logos';
//   logos.npm  // => 'data:image/svg+xml;base64,...'
//   logos.go   // => 'data:image/svg+xml;base64,...'

import { addTemplate, addTypeTemplate, defineNuxtModule } from 'nuxt/kit';

// Icons to extract from simple-icons (add new entries as needed).
const BADGE_ICONS = ['npm', 'go'] as const;

type BadgeIconName = typeof BADGE_ICONS[number];

/** Wrap an iconify SVG body in a complete SVG element with white fill. */
function makeSvg(body: string, size: number): string {
  // Replace currentColor fill with white for badge logos.
  const whitened = body.replaceAll('fill="currentColor"', 'fill="white"');
  return [
    `<svg fill="white" role="img" viewBox="0 0 ${size} ${size}"`,
    ' xmlns="http://www.w3.org/2000/svg">',
    whitened,
    '</svg>',
  ].join('');
}

export default defineNuxtModule({
  meta: { name: 'badge-logos' },
  async setup(_options, nuxt) {
    const template = addTemplate({
      filename: 'badge-logos.mjs',
      write: true,
      async getContents() {
        // Runs at build time in Node.js — safe to load the full
        // 4.7 MB collection; only the extracted icons end up in
        // the server bundle.
        const collection = await import(
          '@iconify-json/simple-icons/icons.json',
          { with: { type: 'json' } }
        ).then((m) => m.default);

        const size = collection.height ?? 24;
        const entries: string[] = [];

        for (const name of BADGE_ICONS) {
          const icon = collection.icons[name];
          if (!icon) {
            console.warn(`[badge-logos] icon "${name}" not found in simple-icons`);
            continue;
          }

          const svg = makeSvg(icon.body, size);
          const b64 = Buffer.from(svg).toString('base64');
          const uri = `data:image/svg+xml;base64,${b64}`;
          entries.push(`  ${JSON.stringify(name)}: ${JSON.stringify(uri)}`);
        }

        return [
          'export const logos = {',
          entries.join(',\n'),
          '};',
        ].join('\n');
      },
    });

    nuxt.options.nitro.alias ||= {};
    nuxt.options.nitro.alias['#badge-logos'] = template.dst;

    const keys = BADGE_ICONS.map((n: BadgeIconName) => `    readonly ${n}: string;`).join('\n');
    addTypeTemplate({
      filename: 'badge-logos.d.ts',
      getContents: () => [
        'declare module \'#badge-logos\' {',
        '  export const logos: {',
        keys,
        '  };',
        '}',
      ].join('\n'),
    }, { nuxt: true, nitro: true });
  },
});
