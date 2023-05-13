import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSessionEntity1683725677893 implements MigrationInterface {
    name = 'AddSessionEntity1683725677893'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "session" ("id" SERIAL NOT NULL, "facilitator" character varying NOT NULL, "start_datetime" TIMESTAMP WITH TIME ZONE NOT NULL, "duration" interval NOT NULL, "courseId" integer, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_2440b236e81d633ff0613ae59d4" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_2440b236e81d633ff0613ae59d4"`);
        await queryRunner.query(`DROP TABLE "session"`);
    }

}
