import { Customer } from '@modules/customers/infra/typeorm/entity/Customer';
import { AppDataSource } from 'data-source';

export const MockCustomerRepository = AppDataSource.getRepository(Customer).extend({});
