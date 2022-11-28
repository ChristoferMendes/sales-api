import type { ICreateCustomer } from '../domain/models/ICreateCustomer';
import type { ICustomersPaginate } from '../domain/models/ICustomersPaginate';
import type { IFindAllCustomers } from '../domain/models/IFindAllCustomers';
import type { ICustomerService } from '../domain/services/ICustomerService';
import { Status } from '@shared/classes/Status';
import { AppError } from '@shared/errors/AppError';
import { CustomerRepository } from '../repository/CustomerRepository';

const { notFound, conflict } = new Status();

export class CustomerService implements ICustomerService {
  async create({ name, email }: ICreateCustomer) {
    const emailExists = await CustomerRepository.findOneBy({ email });

    if (emailExists) throw new AppError('Email already exists', conflict);

    const customer = CustomerRepository.create({ name, email });

    await CustomerRepository.save(customer);

    return customer;
  }

  async findAll({ page, skip, take }: IFindAllCustomers) {
    const [customers, count] = await CustomerRepository.createQueryBuilder().skip(skip).take(take).getManyAndCount();

    const result: ICustomersPaginate = {
      per_page: take,
      total: count,
      current_page: page,
      data: customers,
    };

    return result;
  }

  async findOne({ uuid }: { uuid: string }) {
    const customer = await CustomerRepository.findOneBy({ uuid });

    if (!customer) throw new AppError('This customer does not exist', notFound);

    return customer;
  }

  async delete({ uuid }: { uuid: string }) {
    const customer = await CustomerRepository.findOneBy({ uuid });

    if (!customer) throw new AppError('Customer not found', notFound);

    await CustomerRepository.remove(customer);

    return customer;
  }

  async update({ uuid, name, email }) {
    const customer = await CustomerRepository.findOneBy({ uuid });

    const emailExists = await CustomerRepository.findOneBy({ email });

    if (emailExists && emailExists.uuid !== customer.uuid) {
      throw new AppError('Email already exists', conflict);
    }

    customer.name = name ?? customer.name;
    customer.email = email ?? customer.email;

    await CustomerRepository.save(customer);

    return customer;
  }
}
