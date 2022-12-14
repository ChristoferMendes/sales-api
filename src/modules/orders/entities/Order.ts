import { Customer } from '@modules/customers/infra/typeorm/entities/Customer';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrdersProducts } from './OrdersProducts';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_uuid' })
  customer: Customer;

  @OneToMany(() => OrdersProducts, (order_products) => order_products.order, {
    cascade: true,
  })
  order_products: OrdersProducts[];

  @Column()
  customer_uuid: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}
