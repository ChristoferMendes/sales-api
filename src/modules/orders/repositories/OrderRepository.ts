import { Customer } from '@modules/customers/entity/Customer';
import { AppDataSource } from 'data-source';
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
  async findByName(id: string): Promise<Order | undefined> {
    const order: Order = await this.findOne(id, {
      relations: ['order_products', 'customer'],
    });

    return order;
  },

  async createOrder({ customer, products }: IRequest) {
    const order: Order = this.create({ customer, order_products: products });

    await this.save(order);

    return order;
  },
});
