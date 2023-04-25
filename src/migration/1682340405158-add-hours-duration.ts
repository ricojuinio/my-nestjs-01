import { MigrationInterface, QueryRunner } from "typeorm";

export class AddHoursDuration1682340405158 implements MigrationInterface {
    name = 'AddHoursDuration1682340405158'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" ADD "hours_duration" integer`);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "CHK_a8b996449cf5dfa867dbe27d2a" CHECK ("hours_duration" > 0)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "CHK_a8b996449cf5dfa867dbe27d2a"`);
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "hours_duration"`);
    }

}
