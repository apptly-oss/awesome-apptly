type RepoProvider = 'github';

const providers: Record<RepoProvider, { baseURL: string; prefix: string }> = {
  github: { prefix: 'github:', baseURL: 'https://github.com/' },
};

export interface RepoInfo {
  label: string
  provider: RepoProvider
  url: string
}

interface ParsedPath {
  directory?: string
  provider: RepoProvider
  repo: string
}

/**
 * Match a provider prefix or base URL, normalise path segments, return provider and parts.
 *
 * Assumes the input after the prefix is a plain `owner/repo/...` path.
 * Full URLs containing a ref (e.g. `/tree/main/`) are not stripped —
 * use the short `provider:` prefix form for those cases.
 */
function splitPath(raw: string): undefined | { parts: string[]; provider: RepoProvider } {
  for (const provider of Object.keys(providers) as RepoProvider[]) {
    const { prefix, baseURL } = providers[provider];
    for (const pfx of [prefix, baseURL]) {
      if (!raw.startsWith(pfx)) continue;
      const parts: string[] = [];
      for (const s of raw.slice(pfx.length).split('/')) {
        if (s === '..') parts.pop();
        else if (s && s !== '.') parts.push(s);
      }
      if (parts.length >= 2) return { provider, parts };
    }
  }
  return undefined;
}

/** Extract repo base and optional directory from normalised parts. */
function parsePath(raw: string): ParsedPath | undefined {
  const split = splitPath(raw);
  if (!split) return undefined;
  const { provider, parts } = split;
  return {
    provider,
    repo: `${parts[0]}/${parts[1]}`,
    directory: parts.length > 2 ? parts.slice(2).join('/') : undefined,
  };
}

/** Shorten deep paths: `a/b/c/d` → `a/b/…/d`. */
function makeRepoLabel(repo: string, directory?: string): string {
  const full = directory ? `${repo}/${directory}` : repo;
  const parts = full.split('/');
  return parts.length > 3 ?
    `${parts[0]}/${parts[1]}/\u2026/${parts.at(-1)!}` :
    full;
}

/**
 * Build the full URL for a repository, optionally including a subdirectory.
 *
 * Directory URLs use GitHub's `/tree/HEAD/` convention. Other providers
 * would need their own URL template.
 */
function makeRepoURL(provider: RepoProvider, repo: string, directory?: string): string {
  const { baseURL } = providers[provider];
  return directory ?
    `${baseURL}${repo}/tree/HEAD/${directory}` :
    `${baseURL}${repo}`;
}

export function parseRepo(raw: string): RepoInfo | undefined {
  const parsed = parsePath(raw);
  if (!parsed) return undefined;

  const { provider, repo, directory } = parsed;

  return {
    provider,
    url: makeRepoURL(provider, repo, directory),
    label: makeRepoLabel(repo, directory),
  };
}
