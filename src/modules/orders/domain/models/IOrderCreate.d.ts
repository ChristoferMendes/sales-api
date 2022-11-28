import type { IProduct } from '@modules/products/domain/models/IProduct';

export interface IOrderCreate {
  customer_uuid: string;
  products: IProduct[];
}
