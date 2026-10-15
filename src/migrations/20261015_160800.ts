import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels"
      DROP COLUMN IF EXISTS "blog_posts_id";
    DROP TABLE IF EXISTS "blog_posts_categories" CASCADE;
    DROP TABLE IF EXISTS "blog_posts" CASCADE;
    DROP TABLE IF EXISTS "_blog_posts_v_version_categories" CASCADE;
    DROP TABLE IF EXISTS "_blog_posts_v" CASCADE;
    DROP TYPE IF EXISTS "public"."enum_blog_posts_categories";
    DROP TYPE IF EXISTS "public"."enum_blog_posts_status";
    DROP TYPE IF EXISTS "public"."enum__blog_posts_v_version_categories";
    DROP TYPE IF EXISTS "public"."enum__blog_posts_v_version_status";
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    -- Blog Posts are intentionally not recreated on rollback; the collection was removed.
  `);
}
