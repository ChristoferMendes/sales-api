import { Customer } from '@modules/customers/infra/typeorm/entities/Customer';
import { AppDataSource } from 'src/data-source';
import { Order } from '../entities/Order';

export interface IRProduct {
  product_uuid: string;
  price: number;
  quantity: number;
}

interface IRequest {
  customer: Customer;
  products: IRProduct[];
}

export const OrderRepository = AppDataSource.getRepository(Order).extend({
  async findByName(uuid: string): Promise<Order | null> {
    const order: Order | null = await this.findOneBy({ uuid });

    return order;
  },

  async createOrder({ customer, products }: IRequest) {
    const order: Order = this.create({ customer, order_products: products });

    await this.save(order);

    return order;
  },
});
