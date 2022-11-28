import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import { Customer } from '@modules/customers/entity/Customer';
import { v4 as uuid } from 'uuid';

export class MockCustomerService {
  private customers: ICustomer[] = [];

  public async create({ name, email }: ICreateCustomer) {
    const customer = new Customer();

    customer.uuid = uuid();
    customer.name = name;
    customer.email = email;

    this.customers.push(customer);

    return customer;
  }
}
