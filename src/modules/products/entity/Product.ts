import { OrdersProducts } from '@modules/orders/entities/OrdersProducts';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CategoryEnum } from './category.enum';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @OneToMany(() => OrdersProducts, (order_products) => order_products.product)
  order_products: OrdersProducts[];

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column('int')
  quantity: number;

  @Column({ type: 'enum', nullable: true, enum: CategoryEnum })
  category: CategoryEnum;

  @Column({ type: 'varchar', nullable: true })
  image_url: string | null;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
