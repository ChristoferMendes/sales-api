import { AppDataSource } from 'data-source';
import { Customer } from '../entity/Customer';

export const CustomerRepository = AppDataSource.getRepository(Customer).extend({
  async findByName(name: string): Promise<Customer | undefined> {
    const customer: Customer = await this.findOne({
      where: {
        name,
      },
    });

    return customer;
  },
});
