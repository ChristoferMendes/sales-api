import { Status } from '@shared/classes/Status';
import { Request, Response } from 'express';
import { OrderService } from '../services/order.service';

const orderService = new OrderService();
const { ok, created } = new Status();

export class OrderController {
  public async show(req: Request, res: Response) {
    const { uuid } = req.params;

    const order = await orderService.showOrder({ uuid });

    return res.status(ok).json(order);
  }

  public async create(req: Request, res: Response) {
    const { customer_uuid, products } = req.body;

    const order = await orderService.create({ customer_uuid, products });
    const content = {
      message: 'Order created with success!',
      data: order,
    };

    return res.status(created).json(content);
  }
}
