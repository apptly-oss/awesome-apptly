// Virtual slug for the "Other" group (projects not under any umbrella).
export const OTHER_SLUG = '_';

/** Shared props for prose heading overrides. */
export interface ProseHeadingProps {
  /** Heading anchor ID, used for the `id` attribute and `#` permalink. */
  id?: string
  /** Anchor glyph shown on hover. */
  glyph?: string
}

/**
 * Type-safe Array.includes that accepts a wider search value.
 *
 * Useful when the array has a narrow literal type (e.g. a Zod enum)
 * and the search value is a plain string.
 */
export function includes<T>(array: readonly T[], value: unknown): value is T {
  return (array as readonly unknown[]).includes(value);
}
