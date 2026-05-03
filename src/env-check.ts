/**
 * Fail fast during `payload migrate` / `next build` with readable errors.
 * Uses pg’s own connection-string parser (same as production) — not `new URL()`, which
 * rejects many valid Postgres URLs at build time.
 */
import { parse as parsePgConn } from "pg-connection-string";

function normalizeDatabaseUrl(rawInput: string): string {
  let s = rawInput.trim();
  /** Vercel/UI copy-paste sometimes wraps the whole value in quotes — invalid for pg */
  if (
    (s.startsWith('"') && s.endsWith('"')) ||
    (s.startsWith("'") && s.endsWith("'"))
  ) {
    s = s.slice(1, -1).trim();
  }
  return s.replace(/\r\n|\n|\r/g, "").trim();
}

export function assertPayloadBuildEnv(): void {
  const raw = process.env.DATABASE_URL;
  if (!raw?.trim()) {
    throw new Error(
      "DATABASE_URL is missing. Set it to a full Postgres URL, e.g. postgresql://user:pass@db.example.com:5432/dbname?sslmode=require",
    );
  }

  const normalized = normalizeDatabaseUrl(raw);
  let hostname: string;
  let parsedForDiag: ReturnType<typeof parsePgConn> | undefined;

  try {
    const parsed = parsePgConn(normalized);
    parsedForDiag = parsed;
    hostname = (parsed.host || "").trim();
  } catch {
    throw new Error(
      "DATABASE_URL could not be parsed (PG URL rules). Common fixes: remove outer \"quotes\" or line breaks in Vercel; keep the postgresql:// prefix; if your password has @ : / or #, use percent-encoding (e.g. @ → %40).",
    );
  }

  if (!hostname) {
    throw new Error(
      'DATABASE_URL parsed with an empty host. Use a form like postgresql://user:password@your-host.example.com:5432/dbname — or a valid socket path only for local builds.',
    );
  }

  if (process.env.DEBUG_PAYLOAD_ENV === "1") {
    console.log("[payload-env] DATABASE_URL host (debug):", hostname);
    console.log(
      "[payload-env] CLOUDFLARE_R2_ACCOUNT_ID set:",
      Boolean(process.env.CLOUDFLARE_R2_ACCOUNT_ID?.trim()),
    );
    console.log(
      "[payload-env] NEXT_PUBLIC_SERVER_URL:",
      process.env.NEXT_PUBLIC_SERVER_URL || "(unset)",
    );
  }

  const onVercel = process.env.VERCEL === "1";
  if (onVercel) {
    if (hostname === "127.0.0.1" || hostname === "localhost") {
      throw new Error(
        "DATABASE_URL uses localhost/127.0.0.1, but Vercel builds run in the cloud — use your real Postgres hostname (Neon, RDS, self-hosted db subdomain, etc.).",
      );
    }
    /** Common tutorial / Docker service names that do not resolve on Vercel’s build network */
    const nonPublicDbHosts = new Set([
      "base",
      "db",
      "postgres",
      "database",
      "host.docker.internal",
    ]);
    if (nonPublicDbHosts.has(hostname)) {
      const user = parsedForDiag?.user || "(unknown)";
      const port = parsedForDiag?.port ?? "(default)";
      const database = parsedForDiag?.database || "(unknown)";
      const looksLikePlaceholderHost = /@base(?::|\/|\?|$)/i.test(normalized);
      throw new Error(
        [
          `DATABASE_URL parses host "${hostname}" (invalid for Vercel). Parsed user=${user} port=${port} database=${database} — password is not shown.`,
          `Fix: use postgresql://payload:PASSWORD@db.nyalalabs.org:5432/nyala_payload?sslmode=require`,
          `so the segment immediately after the last @ is db.nyalalabs.org, not "${hostname}".`,
          looksLikePlaceholderHost
            ? `Your URL text contains "@base" before the port or path — replace that host with db.nyalalabs.org.`
            : `If the host in the dashboard looks correct, an unescaped @ in the password breaks parsing — encode @ as %40.`,
          `Set DATABASE_URL for the same Vercel environment as this build (Production vs Preview). Redeploy after saving.`,
        ].join(" "),
      );
    }
    const accountId = process.env.CLOUDFLARE_R2_ACCOUNT_ID?.trim();
    if (!accountId) {
      throw new Error(
        "CLOUDFLARE_R2_ACCOUNT_ID is empty. Set it on Vercel so Payload can reach Cloudflare R2 during build.",
      );
    }
  }
}

assertPayloadBuildEnv();
