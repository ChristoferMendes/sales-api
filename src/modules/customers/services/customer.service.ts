import type { ICreateCustomer } from '../domain/models/ICreateCustomer';
import type { ICustomersPaginate } from '../domain/models/ICustomersPaginate';
import type { IFindAllCustomers } from '../domain/models/IFindAllCustomers';
import type { ICustomerService } from '../domain/services/ICustomerService';
import { Status } from '@shared/classes/Status';
import { AppError } from '@shared/errors/AppError';
import { Repository } from 'typeorm';
import { Customer } from '../infra/typeorm/entities/Customer';
import { CustomerRepository } from '../infra/typeorm/repositories/CustomerRepository';

const { notFound, conflict } = new Status();

export class CustomerService implements ICustomerService {
  private customerRepository: Repository<Customer> = CustomerRepository;

  async create({ name, email }: ICreateCustomer) {
    const emailExists = await this.customerRepository.findOneBy({ email });

    if (emailExists) throw new AppError('Email already exists', conflict);

    const customer = this.customerRepository.create({ name, email });

    await this.customerRepository.save(customer);

    return customer;
  }

  async findAll({ page, skip, take }: IFindAllCustomers) {
    const [customers, count] = await this.customerRepository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result: ICustomersPaginate = {
      per_page: take,
      total: count,
      current_page: page,
      data: customers,
    };

    return result;
  }

  async findOne({ uuid }: { uuid: string }) {
    const customer = await this.customerRepository.findOneBy({ uuid });

    if (!customer) throw new AppError('This customer does not exist', notFound);

    return customer;
  }

  async delete({ uuid }: { uuid: string }) {
    const customer = await this.customerRepository.findOneBy({ uuid });

    if (!customer) throw new AppError('Customer not found', notFound);

    await this.customerRepository.remove(customer);

    return customer;
  }

  async update({ uuid, name, email }: { uuid: string; name: string; email: string }) {
    const customer = await this.customerRepository.findOneBy({ uuid });

    if (!customer) throw new AppError('Customer not found', notFound);

    const emailExists = await this.customerRepository.findOneBy({ email });

    if (emailExists && emailExists.uuid !== customer.uuid) {
      throw new AppError('Email already exists', conflict);
    }

    customer.name = name ?? customer.name;
    customer.email = email ?? customer.email;

    await this.customerRepository.save(customer);

    return customer;
  }
}
