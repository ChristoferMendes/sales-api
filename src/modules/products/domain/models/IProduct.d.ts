import { IOrdersProducts } from '@modules/orders/domain/models/IOrdersProducts';

export interface IProduct {
  uuid: string;

  order_products: IOrdersProducts[];

  name: string;

  price: number;

  quantity: number;

  created_at: Date;

  updated_at: Date;
}
