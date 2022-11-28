import type { ICreateCustomer } from '../models/ICreateCustomer';
import type { ICustomer } from '../models/ICustomer';
import type { ICustomersPaginate } from '../models/ICustomersPaginate';
import type { IFindAllCustomers } from '../models/IFindAllCustomers';
import type { IUpdateCustomer } from '../models/IUpdateCustomer';

export interface ICustomerService {
  create({ name, email }: ICreateCustomer): Promise<ICustomer | null>;

  update({ uuid, name, email }: IUpdateCustomer): Promise<ICustomer | null>;

  findOne({ uuid }: Pick<ICustomer, 'uuid'>): Promise<ICustomer | null>;

  findAll({ page, skip, take }: IFindAllCustomers): Promise<ICustomersPaginate | null>;

  delete({ uuid }: Pick<ICustomer, 'uuid'>): Promise<ICustomer | null>;
}
