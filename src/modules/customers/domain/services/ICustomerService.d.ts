import type { ICreateCustomer } from '../models/ICreateCustomer';
import type { ICustomer } from '../models/ICustomer';
import type { ICustomersPaginate } from '../models/ICustomersPaginate';
import type { IFindAllCustomers } from '../models/IFindAllCustomers';
import type { IUpdateCustomer } from '../models/IUpdateCustomer';

export interface ICustomerService {
  create({ name, email }: ICreateCustomer): Promise<ICustomer>;

  update({ uuid, name, email }: IUpdateCustomer): Promise<ICustomer>;

  findOne({ uuid }: Pick<ICustomer, 'uuid'>): Promise<ICustomer>;

  findAll({ page, skip, take }: IFindAllCustomers): Promise<ICustomersPaginate>;

  delete({ uuid }: Pick<ICustomer, 'uuid'>): Promise<ICustomer>;
}
