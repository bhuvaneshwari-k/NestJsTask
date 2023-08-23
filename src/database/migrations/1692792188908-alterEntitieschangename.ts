import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterEntitieschangename1692792188908 implements MigrationInterface {
    name = 'AlterEntitieschangename1692792188908'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" RENAME COLUMN "Order_number" TO "postOrderNumber"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" RENAME COLUMN "postOrderNumber" TO "Order_number"`);
    }

}
