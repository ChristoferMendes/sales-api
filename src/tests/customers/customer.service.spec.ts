import 'reflect-metadata';
import { MockCustomerRepository } from './mocks/MockCustomerRepository';
import { MockCustomerService } from './mocks/MockCustomerService';

const mockCustomerService = new MockCustomerService();

describe('Customer service', () => {
  it('should be able to create a new customer', async () => {
    // const customer = await
    // expect(customer).toHaveProperty('uuid');
  });
});
