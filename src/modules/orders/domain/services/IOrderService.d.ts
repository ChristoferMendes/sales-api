import type { IOrder } from '../models/IOrder';
import type { IOrderCreate } from '../models/IOrderCreate';

export interface IOrderService {
  create({ customer_uuid, products }: IOrderCreate): Promise<IOrder>;

  showOrder({ uuid }: Pick<IOrder, 'uuid'>): Promise<IOrder>;
}
