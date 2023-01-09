import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

const newImageUrlColumn = new TableColumn({ name: 'image_url', type: 'varchar', isNullable: true });
const oldImageUrlColumn = new TableColumn({ name: 'image_url', type: 'varchar' });

export class AddNullToImageUrlColumnInProducts1673265895897 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn('products', 'image_url', newImageUrlColumn);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn('products', 'image_url', oldImageUrlColumn);
  }
}
