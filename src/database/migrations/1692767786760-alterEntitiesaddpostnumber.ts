import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterEntitiesaddpostnumber1692767786760 implements MigrationInterface {
    name = 'AlterEntitiesaddpostnumber1692767786760'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ADD "Order_number" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "Order_number"`);
    }

}
