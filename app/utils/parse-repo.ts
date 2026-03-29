export interface RepoInfo {
  provider: 'github'
  url: string
  label: string
}

export function parseRepo(raw: string): RepoInfo | undefined {
  if (!raw.startsWith('github:')) return undefined;
  const path = raw.slice('github:'.length);
  const parts = path.split('/');
  if (parts.length < 2) return undefined;

  const owner = parts[0];
  const repo = parts[1];
  const directory = parts.length > 2 ? parts.slice(2).join('/') : undefined;

  const url = directory ?
    `https://github.com/${owner}/${repo}/tree/HEAD/${directory}` :
    `https://github.com/${owner}/${repo}`;

  return { provider: 'github', url, label: path };
}
