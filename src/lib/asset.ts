/** Resolve a public asset path respecting the configured base URL. */
export const asset = (path: string): string => import.meta.env.BASE_URL + path;