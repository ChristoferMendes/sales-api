import type { ICustomer } from './ICustomer';

export interface ICustomersPaginate {
  per_page: number;
  total: number;
  current_page: number;
  data: ICustomer[];
}
