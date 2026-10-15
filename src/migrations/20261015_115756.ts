import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "news" CASCADE;
    ALTER TABLE "payload_locked_documents_rels"
      DROP COLUMN IF EXISTS "news_id";
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "news" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "slug" varchar NOT NULL,
      "body" jsonb,
      "cover_image_id" integer,
      "published_at" timestamp(3) with time zone NOT NULL,
      "updated_at" timestamp(3) with time zone NOT NULL,
      "created_at" timestamp(3) with time zone NOT NULL
    );
    CREATE UNIQUE INDEX IF NOT EXISTS "news_slug_idx" ON "news" USING btree ("slug");
    CREATE INDEX IF NOT EXISTS "news_cover_image_idx" ON "news" USING btree ("cover_image_id");
    CREATE INDEX IF NOT EXISTS "news_updated_at_idx" ON "news" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "news_created_at_idx" ON "news" USING btree ("created_at");
    ALTER TABLE "news"
      DROP CONSTRAINT IF EXISTS "news_cover_image_id_media_id_fk",
      ADD CONSTRAINT "news_cover_image_id_media_id_fk"
        FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id")
        ON DELETE SET NULL ON UPDATE NO ACTION;
    ALTER TABLE "payload_locked_documents_rels"
      ADD COLUMN IF NOT EXISTS "news_id" integer;
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_news_id_idx"
      ON "payload_locked_documents_rels" USING btree ("news_id");
    ALTER TABLE "payload_locked_documents_rels"
      DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_news_fk",
      ADD CONSTRAINT "payload_locked_documents_rels_news_fk"
        FOREIGN KEY ("news_id") REFERENCES "public"."news"("id")
        ON DELETE CASCADE ON UPDATE NO ACTION;
  `);
}
