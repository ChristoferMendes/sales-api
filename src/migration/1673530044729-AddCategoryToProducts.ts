import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

const categoryColumn = new TableColumn({ name: 'category', type: 'varchar', isNullable: true });

export class AddCategoryToProducts1673530044729 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('products', categoryColumn);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('products', categoryColumn);
  }
}
