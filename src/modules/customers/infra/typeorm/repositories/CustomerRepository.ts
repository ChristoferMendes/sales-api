import { AppDataSource } from 'src/data-source';
import { Customer } from '../entities/Customer';

export const CustomerRepository = AppDataSource.getRepository(Customer).extend({
  async findByName(name: string): Promise<Customer | null> {
    const customer: Customer | null = await this.findOneBy({ name });

    return customer;
  },
});
