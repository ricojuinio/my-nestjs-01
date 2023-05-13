import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameCourseIdColname1683946246495 implements MigrationInterface {
    name = 'RenameCourseIdColname1683946246495'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_2440b236e81d633ff0613ae59d4"`);
        await queryRunner.query(`ALTER TABLE "session" RENAME COLUMN "courseId" TO "course_id"`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_ba45b38dc805f4308beb7fe8ec3" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_ba45b38dc805f4308beb7fe8ec3"`);
        await queryRunner.query(`ALTER TABLE "session" RENAME COLUMN "course_id" TO "courseId"`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_2440b236e81d633ff0613ae59d4" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
