import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

const descriptionColumn = new TableColumn({ name: 'descrirption', type: 'varchar' });
const imageUrlColumn = new TableColumn({ name: 'image_url', type: 'varchar' });
const newColums = [descriptionColumn, imageUrlColumn];

export class AddDescriptionAndImageUrlToProduct1673265440933 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('products', newColums);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('products', newColums);
  }
}
