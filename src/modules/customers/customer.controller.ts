import { Status } from '@shared/classes/Status';
import { Request, Response } from 'express';
import { CustomerService } from './services/customer.service';

const productService = new CustomerService();
const { ok, created } = new Status();

export class CustomerController {
  async index(req: Request, res: Response) {
    const page = req.query.page ? Number(req.query.page) : 1;
    const take = req.query.limit ? Number(req.query.limit) : 15;
    const skip = (page - 1) * take;

    const customers = await productService.findAll({ page, take, skip });

    return res.status(ok).json(customers);
  }

  async show(req: Request, res: Response) {
    const { uuid } = req.params;

    const product = await productService.findOne({ uuid });

    return res.status(ok).json(product);
  }

  async create(req: Request, res: Response) {
    const { name, email } = req.body;

    const product = await productService.create({
      name,
      email,
    });

    return res.status(created).json({ message: 'Customer created', product });
  }

  async update(req: Request, res: Response) {
    const { name, email } = req.body;
    const { uuid } = req.body;

    const product = await productService.update({
      uuid,
      name,
      email,
    });

    return res.status(ok).json({ message: 'Customer updated', product });
  }

  async delete(req: Request, res: Response) {
    const { uuid } = req.params;

    const productDeleted = await productService.delete({ uuid });

    return res.status(ok).json({ message: 'Customer deleted', productDeleted });
  }
}
