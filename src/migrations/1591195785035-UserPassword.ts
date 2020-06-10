import {MigrationInterface, QueryRunner} from "typeorm";

export class UserPassword1591195785035 implements MigrationInterface {
    name = 'UserPassword1591195785035'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "phone" varchar NOT NULL, "birthDay" datetime NOT NULL, "password" varchar NOT NULL DEFAULT (''))`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "email", "firstName", "lastName", "phone", "birthDay") SELECT "id", "email", "firstName", "lastName", "phone", "birthDay" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "phone" varchar NOT NULL, "birthDay" datetime NOT NULL)`);
        await queryRunner.query(`INSERT INTO "user"("id", "email", "firstName", "lastName", "phone", "birthDay") SELECT "id", "email", "firstName", "lastName", "phone", "birthDay" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
    }

}
