import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

const oldColumn = new TableColumn({ name: 'category', type: 'varchar', isNullable: true });
const newColumn = new TableColumn({
  name: 'category',
  type: 'enum',
  enum: ['Hamburguer', 'Snack', 'Pizza', 'Salad'],
  isNullable: true,
});

export class ChangeProductsCategoryToEnum1673530967562 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn('products', oldColumn, newColumn);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn('products', newColumn, oldColumn);
  }
}
