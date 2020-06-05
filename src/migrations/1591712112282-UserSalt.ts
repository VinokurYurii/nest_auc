import {MigrationInterface, QueryRunner} from "typeorm";

export class UserSalt1591712112282 implements MigrationInterface {
    name = 'UserSalt1591712112282'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "phone" varchar NOT NULL, "birthDay" datetime NOT NULL, "password" varchar NOT NULL DEFAULT (''), "salt" varchar NOT NULL DEFAULT (''))`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "email", "firstName", "lastName", "phone", "birthDay", "password") SELECT "id", "email", "firstName", "lastName", "phone", "birthDay", "password" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "phone" varchar NOT NULL, "birthDay" datetime NOT NULL, "password" varchar NOT NULL DEFAULT (''), "salt" varchar NOT NULL DEFAULT (''), CONSTRAINT "UQ_ed766a9782779b8390a2a81f444" UNIQUE ("email"), CONSTRAINT "UQ_d17f45781ac3bacc05451cf03d9" UNIQUE ("phone"))`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "email", "firstName", "lastName", "phone", "birthDay", "password", "salt") SELECT "id", "email", "firstName", "lastName", "phone", "birthDay", "password", "salt" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "phone" varchar NOT NULL, "birthDay" datetime NOT NULL, "password" varchar NOT NULL DEFAULT (''), "salt" varchar NOT NULL DEFAULT (''))`);
        await queryRunner.query(`INSERT INTO "user"("id", "email", "firstName", "lastName", "phone", "birthDay", "password", "salt") SELECT "id", "email", "firstName", "lastName", "phone", "birthDay", "password", "salt" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "phone" varchar NOT NULL, "birthDay" datetime NOT NULL, "password" varchar NOT NULL DEFAULT (''))`);
        await queryRunner.query(`INSERT INTO "user"("id", "email", "firstName", "lastName", "phone", "birthDay", "password") SELECT "id", "email", "firstName", "lastName", "phone", "birthDay", "password" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
    }

}
