import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Fix: homepage_hero_media.media_id and homepage_highlights.image_id are NOT NULL,
 * but their FK constraints were ON DELETE SET NULL — which Postgres rejects.
 * Change both FKs to ON DELETE CASCADE so deleting a media item removes the
 * referencing array rows instead of trying to null a non-nullable column.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "homepage_hero_media"
      DROP CONSTRAINT IF EXISTS "homepage_hero_media_media_id_media_id_fk",
      ADD CONSTRAINT "homepage_hero_media_media_id_media_id_fk"
        FOREIGN KEY ("media_id") REFERENCES "public"."media"("id")
        ON DELETE CASCADE ON UPDATE NO ACTION;

    ALTER TABLE "homepage_highlights"
      DROP CONSTRAINT IF EXISTS "homepage_highlights_image_id_media_id_fk",
      ADD CONSTRAINT "homepage_highlights_image_id_media_id_fk"
        FOREIGN KEY ("image_id") REFERENCES "public"."media"("id")
        ON DELETE CASCADE ON UPDATE NO ACTION;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "homepage_hero_media"
      DROP CONSTRAINT IF EXISTS "homepage_hero_media_media_id_media_id_fk",
      ADD CONSTRAINT "homepage_hero_media_media_id_media_id_fk"
        FOREIGN KEY ("media_id") REFERENCES "public"."media"("id")
        ON DELETE SET NULL ON UPDATE NO ACTION;

    ALTER TABLE "homepage_highlights"
      DROP CONSTRAINT IF EXISTS "homepage_highlights_image_id_media_id_fk",
      ADD CONSTRAINT "homepage_highlights_image_id_media_id_fk"
        FOREIGN KEY ("image_id") REFERENCES "public"."media"("id")
        ON DELETE SET NULL ON UPDATE NO ACTION;
  `)
}
