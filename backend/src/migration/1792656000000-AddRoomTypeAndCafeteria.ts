import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoomTypeAndCafeteria1792656000000 implements MigrationInterface {
    name = 'AddRoomTypeAndCafeteria1792656000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "room_type" ("id" SERIAL NOT NULL, "name" character varying(50), CONSTRAINT "UQ_0e04f7180c0010be1afdb248607" UNIQUE ("name"), CONSTRAINT "PK_abd0f8a4c8a444a84fa2b343353" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cafeteria" ("id" SERIAL NOT NULL, "capacity" integer, "opening_time" TIME, "closing_time" TIME, "id_classroom" integer, CONSTRAINT "REL_61bcc8d1666fe70439abf463dc" UNIQUE ("id_classroom"), CONSTRAINT "PK_3b5c7abe2262d7c78e81c37e0c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "classroom" ADD "id_room_type" integer`);
        await queryRunner.query(`ALTER TABLE "classroom" ADD CONSTRAINT "FK_a1a790a41a1664790aa7da5aade" FOREIGN KEY ("id_room_type") REFERENCES "room_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cafeteria" ADD CONSTRAINT "FK_61bcc8d1666fe70439abf463dc2" FOREIGN KEY ("id_classroom") REFERENCES "classroom"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);

        // Default room types; existing rooms are all classrooms.
        await queryRunner.query(`INSERT INTO "room_type" ("name") VALUES ('classroom'), ('cafeteria')`);
        await queryRunner.query(`UPDATE "classroom" SET "id_room_type" = (SELECT "id" FROM "room_type" WHERE "name" = 'classroom')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cafeteria" DROP CONSTRAINT "FK_61bcc8d1666fe70439abf463dc2"`);
        await queryRunner.query(`ALTER TABLE "classroom" DROP CONSTRAINT "FK_a1a790a41a1664790aa7da5aade"`);
        await queryRunner.query(`ALTER TABLE "classroom" DROP COLUMN "id_room_type"`);
        await queryRunner.query(`DROP TABLE "cafeteria"`);
        await queryRunner.query(`DROP TABLE "room_type"`);
    }

}
