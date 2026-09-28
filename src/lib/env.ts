/** Hostnames that count as "running locally" for dev-only UI. */
const LOCAL_HOSTNAMES = new Set(["localhost", "127.0.0.1", "[::1]", "::1"]);

/**
 * True while the site is served from a local host — the Vite dev server (any
 * host, including LAN IPs) or a production build previewed on localhost.
 * False on any deployed hostname, which is how the dev-only résumé entry
 * stays out of the public build.
 */
export const isLocalHost = (): boolean =>
  import.meta.env.DEV ||
  (typeof window !== "undefined" && LOCAL_HOSTNAMES.has(window.location.hostname));
