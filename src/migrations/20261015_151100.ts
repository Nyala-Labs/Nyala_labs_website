import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "homepage_highlights" CASCADE;
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "homepage_highlights" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "image_id" integer NOT NULL,
      "caption" varchar
    );
    ALTER TABLE "homepage_highlights"
      DROP CONSTRAINT IF EXISTS "homepage_highlights_image_id_media_id_fk",
      ADD CONSTRAINT "homepage_highlights_image_id_media_id_fk"
        FOREIGN KEY ("image_id") REFERENCES "public"."media"("id")
        ON DELETE CASCADE ON UPDATE NO ACTION;
    ALTER TABLE "homepage_highlights"
      DROP CONSTRAINT IF EXISTS "homepage_highlights_parent_id_fk",
      ADD CONSTRAINT "homepage_highlights_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id")
        ON DELETE CASCADE ON UPDATE NO ACTION;
    CREATE INDEX IF NOT EXISTS "homepage_highlights_order_idx"
      ON "homepage_highlights" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "homepage_highlights_parent_id_idx"
      ON "homepage_highlights" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "homepage_highlights_image_idx"
      ON "homepage_highlights" USING btree ("image_id");
  `);
}
