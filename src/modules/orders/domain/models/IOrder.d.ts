import type { ICustomer } from '@modules/customers/domain/models/ICustomer';
import type { OrdersProducts } from '@modules/orders/entities/OrdersProducts';

export interface IOrder {
  uuid: string;

  customer: ICustomer;

  order_products: OrdersProducts[];

  created_at: Date;

  updated_at: Date;
}
