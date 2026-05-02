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

  try {
    const parsed = parsePgConn(normalized);
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
      throw new Error(
        `DATABASE_URL uses host "${hostname}", which is not a public DNS name. On Vercel, set DATABASE_URL to your real Postgres host (e.g. Neon, Supabase, or db.yourdomain.com with ?sslmode=require), not a Compose service name or placeholder.`,
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
