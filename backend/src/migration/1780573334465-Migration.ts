import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1780573334465 implements MigrationInterface {
    name = 'Migration1780573334465'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "name" character varying(50), CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "building" ("id" SERIAL NOT NULL, "name" character varying(100), CONSTRAINT "PK_bbfaf6c11f141a22d2ab105ee5f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "floor" ("id" SERIAL NOT NULL, "level" integer, "id_building" integer, CONSTRAINT "PK_16a0823530c5b0dd226b8a96ee1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "equipment" ("id" SERIAL NOT NULL, "name" text, CONSTRAINT "PK_0722e1b9d6eb19f5874c1678740" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "classroom_equipment" ("id_classroom" integer NOT NULL, "id_equipment" integer NOT NULL, "started_at" TIMESTAMP, "ended_at" TIMESTAMP, "quantity" integer, CONSTRAINT "PK_7f88ca1546e01c19fad9df12d31" PRIMARY KEY ("id_classroom", "id_equipment"))`);
        await queryRunner.query(`CREATE TABLE "classroom" ("id" SERIAL NOT NULL, "name_room" character varying(100), "maintenance" boolean, "id_floor" integer, CONSTRAINT "PK_729f896c8b7b96ddf10c341e6ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "booking" ("id" SERIAL NOT NULL, "started_at" TIMESTAMP, "ended_at" TIMESTAMP, "user_id" integer, "classroom_id" integer, CONSTRAINT "PK_49171efc69702ed84c812f33540" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "first_name" character varying(100), "last_name" character varying(100), "email" character varying(255), "password" character varying(255), "role_id" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "floor" ADD CONSTRAINT "FK_4d456f1ef6f9533af2e35b8461a" FOREIGN KEY ("id_building") REFERENCES "building"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "classroom_equipment" ADD CONSTRAINT "FK_ef980c7b13e323a3f43441f0ff7" FOREIGN KEY ("id_classroom") REFERENCES "classroom"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "classroom_equipment" ADD CONSTRAINT "FK_443de7d6f7cac838d484caf2b92" FOREIGN KEY ("id_equipment") REFERENCES "equipment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "classroom" ADD CONSTRAINT "FK_7159e1846e93b5686e18122bf74" FOREIGN KEY ("id_floor") REFERENCES "floor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_276896d1a1a30be6de9d7d43f53" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_532888bc86bbb0a4abf6f6a1186" FOREIGN KEY ("classroom_id") REFERENCES "classroom"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_532888bc86bbb0a4abf6f6a1186"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_276896d1a1a30be6de9d7d43f53"`);
        await queryRunner.query(`ALTER TABLE "classroom" DROP CONSTRAINT "FK_7159e1846e93b5686e18122bf74"`);
        await queryRunner.query(`ALTER TABLE "classroom_equipment" DROP CONSTRAINT "FK_443de7d6f7cac838d484caf2b92"`);
        await queryRunner.query(`ALTER TABLE "classroom_equipment" DROP CONSTRAINT "FK_ef980c7b13e323a3f43441f0ff7"`);
        await queryRunner.query(`ALTER TABLE "floor" DROP CONSTRAINT "FK_4d456f1ef6f9533af2e35b8461a"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "booking"`);
        await queryRunner.query(`DROP TABLE "classroom"`);
        await queryRunner.query(`DROP TABLE "classroom_equipment"`);
        await queryRunner.query(`DROP TABLE "equipment"`);
        await queryRunner.query(`DROP TABLE "floor"`);
        await queryRunner.query(`DROP TABLE "building"`);
        await queryRunner.query(`DROP TABLE "role"`);
    }

}
