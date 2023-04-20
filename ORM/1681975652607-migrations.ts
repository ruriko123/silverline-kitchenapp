import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1681975652607 implements MigrationInterface {
    name = 'Migrations1681975652607'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_admin\` ADD \`Token\` varchar(200) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_admin\` DROP COLUMN \`Token\``);
    }

}
