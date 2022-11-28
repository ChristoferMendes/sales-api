import { Customer } from '@modules/customers/entity/Customer';
import { AppDataSource } from 'data-source';

export const MockCustomerRepository = AppDataSource.getRepository(Customer).extend({});
