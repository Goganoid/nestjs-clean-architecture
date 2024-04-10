import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1709373370824 implements MigrationInterface {
    name = 'InitialMigration1709373370824'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "spaceship_model" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "size" double precision NOT NULL, "armour" double precision NOT NULL, "thrust" double precision NOT NULL, "jump" double precision NOT NULL, "maxPower" double precision NOT NULL, "maxFuel" double precision NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8bf1ed0306e7d6ab9d566a905f8" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "spaceship_model"`);
    }

}
