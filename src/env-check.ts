/**
 * Fail fast during `payload migrate` / `next build` with readable errors.
 * ENOTFOUND hostname "base" usually means DATABASE_URL used host `base`
 * (placeholder) or an unescaped `@` in the password broke parsing.
 */
export function assertPayloadBuildEnv(): void {
  const raw = process.env.DATABASE_URL;
  if (!raw?.trim()) {
    throw new Error(
      "DATABASE_URL is missing. Set it to a full Postgres URL, e.g. postgresql://user:pass@db.example.com:5432/dbname?sslmode=require",
    );
  }

  let hostname: string;
  try {
    const pseudo = raw.replace(/^postgres(ql)?:/i, "http:");
    hostname = new URL(pseudo).hostname;
  } catch {
    throw new Error(
      'DATABASE_URL could not be parsed. If the password contains "@", ":", or "/", URL-encode those characters (e.g. "@" → "%40").',
    );
  }

  if (!hostname) {
    throw new Error(
      'DATABASE_URL has no hostname after the last "@". Check the host part (e.g. ...@your-db-host.example.com:5432/... ).',
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
