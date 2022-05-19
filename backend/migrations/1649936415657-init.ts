import {MigrationInterface, QueryRunner} from "typeorm";

export class init1649936415657 implements MigrationInterface {
    name = 'init1649936415657'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "conversation-pairs" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "conversation_first" integer, "conversation_second" integer)`);
        await queryRunner.query(`CREATE INDEX "IDX_7e85b33d8bcca62c492bad6cec" ON "conversation-pairs" ("id") `);
        await queryRunner.query(`CREATE TABLE "conversations" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "owner" integer NOT NULL, "conversation_uuid" text NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE INDEX "IDX_ee34f4f7ced4ec8681f26bf04e" ON "conversations" ("id") `);
        await queryRunner.query(`CREATE TABLE "block-list" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "word" text NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE INDEX "IDX_f5183c6984a31d3a470ec89a16" ON "block-list" ("id") `);
        await queryRunner.query(`CREATE TABLE "logs" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "blocked_content" text NOT NULL, "conversation_uuid" text NOT NULL, "original_text" text NOT NULL, "user_id" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE INDEX "IDX_fb1b805f2f7795de79fa69340b" ON "logs" ("id") `);
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "user_id" integer NOT NULL, "user_name" text NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE INDEX "IDX_a3ffb1c0c8416b9fc6f907b743" ON "users" ("id") `);
        await queryRunner.query(`DROP INDEX "IDX_7e85b33d8bcca62c492bad6cec"`);
        await queryRunner.query(`CREATE TABLE "temporary_conversation-pairs" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "conversation_first" integer, "conversation_second" integer, CONSTRAINT "FK_715b064e6eb081ae72277cb149c" FOREIGN KEY ("conversation_first") REFERENCES "conversations" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_8a2ff364cf7de11be4eca7fcbe9" FOREIGN KEY ("conversation_second") REFERENCES "conversations" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_conversation-pairs"("id", "created_at", "conversation_first", "conversation_second") SELECT "id", "created_at", "conversation_first", "conversation_second" FROM "conversation-pairs"`);
        await queryRunner.query(`DROP TABLE "conversation-pairs"`);
        await queryRunner.query(`ALTER TABLE "temporary_conversation-pairs" RENAME TO "conversation-pairs"`);
        await queryRunner.query(`CREATE INDEX "IDX_7e85b33d8bcca62c492bad6cec" ON "conversation-pairs" ("id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_7e85b33d8bcca62c492bad6cec"`);
        await queryRunner.query(`ALTER TABLE "conversation-pairs" RENAME TO "temporary_conversation-pairs"`);
        await queryRunner.query(`CREATE TABLE "conversation-pairs" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "conversation_first" integer, "conversation_second" integer)`);
        await queryRunner.query(`INSERT INTO "conversation-pairs"("id", "created_at", "conversation_first", "conversation_second") SELECT "id", "created_at", "conversation_first", "conversation_second" FROM "temporary_conversation-pairs"`);
        await queryRunner.query(`DROP TABLE "temporary_conversation-pairs"`);
        await queryRunner.query(`CREATE INDEX "IDX_7e85b33d8bcca62c492bad6cec" ON "conversation-pairs" ("id") `);
        await queryRunner.query(`DROP INDEX "IDX_a3ffb1c0c8416b9fc6f907b743"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP INDEX "IDX_fb1b805f2f7795de79fa69340b"`);
        await queryRunner.query(`DROP TABLE "logs"`);
        await queryRunner.query(`DROP INDEX "IDX_f5183c6984a31d3a470ec89a16"`);
        await queryRunner.query(`DROP TABLE "block-list"`);
        await queryRunner.query(`DROP INDEX "IDX_ee34f4f7ced4ec8681f26bf04e"`);
        await queryRunner.query(`DROP TABLE "conversations"`);
        await queryRunner.query(`DROP INDEX "IDX_7e85b33d8bcca62c492bad6cec"`);
        await queryRunner.query(`DROP TABLE "conversation-pairs"`);
    }

}
