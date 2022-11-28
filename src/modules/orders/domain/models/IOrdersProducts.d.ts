import type { IProduct } from '@modules/products/domain/models/IProduct';
import type { IOrder } from './IOrder';

export interface IOrdersProducts {
  uuid: string;

  order: IOrder;

  product: IProduct;

  order_uuid: string;

  product_uuid: string;

  price: number;

  quantity: number;

  created_at: Date;

  updated_at: Date;
}
