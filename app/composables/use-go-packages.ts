/**
 * Lookup map from Go module path to internal project path.
 *
 * Fetches all projects that have a `go` field and builds a
 * `Map<modulePath, path>`. Cached via `useAsyncData` with a
 * fixed key so the query runs at most once per page load.
 *
 * Synchronous — does not require `await`. The underlying
 * `useAsyncData` registers with Nuxt's SSR context and is
 * resolved by the page-level Suspense boundary.
 */
export function useGoPackages() {
  const { data, status } = useAsyncData('go-packages', async () => {
    const projects = await queryCollection('projects')
      .select('path', 'go')
      .where('go', 'IS NOT NULL')
      .all();

    const entries: [string, string][] = [];
    for (const p of projects) {
      if (p.go) entries.push([p.go, p.path]);
    }
    return Object.fromEntries(entries);
  });

  /** Reactive map from Go module path to internal project path. */
  const map = computed(() => data.value ? new Map(Object.entries(data.value)) : new Map<string, string>());

  /** Whether the package map has finished loading. */
  const ready = computed(() => status.value === 'success' || status.value === 'error');

  /** Resolve the internal project path for a Go module, or `undefined`. */
  function resolve(module_: string): string | undefined {
    return map.value.get(module_);
  }

  return { map, ready, resolve };
}
