import { consola } from 'consola';

const logger = consola.withTag('version-cache');

export interface FetchResult {
  lastModified?: Date
  version: string
}

interface StoredVersion {
  lastModified: string // ISO 8601 — Date doesn't survive JSON round-trip
  version?: string // omitted for failed lookups — avoids null in JSON
}

interface InflightResult {
  lastModified: Date
  result: FetchResult | undefined
  ttl: number
}

const TTL_OK = 3600; // 1 hour
const TTL_ERROR = 60; // 1 minute

// In-flight deduplication — only holds promises for active upstream
// fetches, so naturally bounded by concurrency, not by key space.
// The originating caller writes to KV; joiners just read the result.
const inflight = new Map<string, Promise<InflightResult>>();

/** Remove a cached version entry, forcing a fresh upstream poll. */
export async function deleteCachedVersion(key: string): Promise<void> {
  inflight.delete(key); // any running IIFE will see it lost its slot and skip the KV write
  try {
    await useStorage('versions').removeItem(key);
  } catch (error) {
    logger.warn(`failed to delete ${key}:`, error);
  }
}

/**
 * Returns the last known version, polling upstream only when
 * the KV entry has expired. Uses the upstream publish time
 * when available, otherwise falls back to the current time.
 *
 * Degrades gracefully — KV failures fall through to an
 * upstream fetch rather than crashing the handler.
 */
export async function fetchVersion(
  key: string,
  fetcher: () => Promise<FetchResult | undefined>,
): Promise<{ lastModified: Date; version: string | undefined }> {
  const storage = useStorage('versions');

  // KV cache hit — return stored data directly
  try {
    const stored = await storage.getItem<StoredVersion>(key);
    if (stored) {
      return {
        version: stored.version,
        lastModified: new Date(stored.lastModified),
      };
    }
  } catch (error) {
    logger.warn(`KV read failed for ${key}:`, error);
  }

  // KV miss or expired — poll upstream with in-flight dedup.
  // The first caller fetches + writes KV; concurrent joiners
  // just await the same result without duplicate writes.
  let pending = inflight.get(key);
  if (!pending) {
    pending = (async () => {
      let result: FetchResult | undefined;
      try {
        result = await fetcher();
      } catch (error) {
        logger.warn(`upstream fetch failed for ${key}:`, error);
      }
      const version = result?.version;
      const lastModified = result?.lastModified ?? new Date();
      const ttl = version === undefined ? TTL_ERROR : TTL_OK;

      const entry: StoredVersion = { lastModified: lastModified.toISOString() };
      if (version) entry.version = version;

      // Skip the write if a DELETE evicted us from inflight mid-fetch
      if (inflight.get(key) === pending) {
        try {
          await storage.setItem(key, entry, { ttl });
        } catch (error) {
          logger.warn(`KV write failed for ${key}:`, error);
        }
      }

      return { result, lastModified, ttl };
    })();
    inflight.set(key, pending);
    pending.finally(() => {
      if (inflight.get(key) === pending) inflight.delete(key);
    });
  }

  const { result, lastModified } = await pending;
  return { version: result?.version, lastModified };
}
