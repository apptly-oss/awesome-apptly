/**
 * Lookup map from npm package name to internal project path.
 *
 * Fetches all projects that have an `npm` field and builds a
 * `Map<packageName, path>`. Cached via `useAsyncData` with a
 * fixed key so the query runs at most once per page load.
 *
 * Synchronous — does not require `await`. The underlying
 * `useAsyncData` registers with Nuxt's SSR context and is
 * resolved by the page-level Suspense boundary.
 */
export function useNpmPackages() {
  const { data, status } = useAsyncData('npm-packages', async () => {
    const projects = await queryCollection('projects')
      .select('path', 'npm')
      .where('npm', 'IS NOT NULL')
      .all();

    const entries: [string, string][] = [];
    for (const p of projects) {
      if (p.npm) entries.push([p.npm, p.path]);
    }
    return Object.fromEntries(entries);
  });

  /** Reactive map from npm package name to internal project path. */
  const map = computed(() => data.value ? new Map(Object.entries(data.value)) : new Map<string, string>());

  /** Whether the package map has finished loading. */
  const ready = computed(() => status.value === 'success' || status.value === 'error');

  /** Resolve the internal project path for an npm package, or `undefined`. */
  function resolve(pkg: string): string | undefined {
    return map.value.get(pkg);
  }

  return { map, ready, resolve };
}
