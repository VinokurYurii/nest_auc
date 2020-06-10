import {MigrationInterface, QueryRunner} from "typeorm";

export class UserEmailConfirmation1591808688207 implements MigrationInterface {
    name = 'UserEmailConfirmation1591808688207'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "phone" varchar NOT NULL, "birthDay" datetime NOT NULL, "password" varchar NOT NULL DEFAULT (''), CONSTRAINT "UQ_8e1f623798118e629b46a9e6299" UNIQUE ("phone"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "email", "firstName", "lastName", "phone", "birthDay", "password") SELECT "id", "email", "firstName", "lastName", "phone", "birthDay", "password" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "phone" varchar NOT NULL, "birthDay" datetime NOT NULL, "password" varchar NOT NULL DEFAULT (''), "mailConfirmationHashString" varchar NOT NULL, "mailConfirmed" boolean NOT NULL DEFAULT (0), CONSTRAINT "UQ_8e1f623798118e629b46a9e6299" UNIQUE ("phone"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "email", "firstName", "lastName", "phone", "birthDay", "password") SELECT "id", "email", "firstName", "lastName", "phone", "birthDay", "password" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
        await queryRunner.query(`CREATE INDEX "IDX_2d8246a97e7a3e71d2bfa924ff" ON "user" ("mailConfirmationHashString") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_2d8246a97e7a3e71d2bfa924ff"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "phone" varchar NOT NULL, "birthDay" datetime NOT NULL, "password" varchar NOT NULL DEFAULT (''), CONSTRAINT "UQ_8e1f623798118e629b46a9e6299" UNIQUE ("phone"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`);
        await queryRunner.query(`INSERT INTO "user"("id", "email", "firstName", "lastName", "phone", "birthDay", "password") SELECT "id", "email", "firstName", "lastName", "phone", "birthDay", "password" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "phone" varchar NOT NULL, "birthDay" datetime NOT NULL, "password" varchar NOT NULL DEFAULT (''), "salt" varchar NOT NULL DEFAULT (''), CONSTRAINT "UQ_8e1f623798118e629b46a9e6299" UNIQUE ("phone"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`);
        await queryRunner.query(`INSERT INTO "user"("id", "email", "firstName", "lastName", "phone", "birthDay", "password") SELECT "id", "email", "firstName", "lastName", "phone", "birthDay", "password" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
    }

}
