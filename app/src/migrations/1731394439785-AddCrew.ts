import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCrew1731394439785 implements MigrationInterface {
    name = 'AddCrew1731394439785'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."crew_role_enum" AS ENUM('PILOT', 'ENGINEER', 'CAPTAIN')`);
        await queryRunner.query(`CREATE TABLE "crew" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "role" "public"."crew_role_enum" NOT NULL, "birthDate" TIMESTAMP WITH TIME ZONE NOT NULL, "salary" numeric NOT NULL, "spaceship_id" uuid NOT NULL, CONSTRAINT "PK_cc72b429996b3476dbaac59f1c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "crew" ADD CONSTRAINT "FK_3afe399eca60aa1c49b4270adf1" FOREIGN KEY ("spaceship_id") REFERENCES "spaceship_model"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "crew" DROP CONSTRAINT "FK_3afe399eca60aa1c49b4270adf1"`);
        await queryRunner.query(`DROP TABLE "crew"`);
        await queryRunner.query(`DROP TYPE "public"."crew_role_enum"`);
    }

}
