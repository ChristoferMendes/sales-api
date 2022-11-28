import { Status } from '@shared/classes/Status';
import { Request, Response } from 'express';
import { ProductService } from './services/product.service';

const productService = new ProductService();
const { ok, created } = new Status();

export class ProductsController {
  async index(req: Request, res: Response) {
    const products = await productService.findAll();

    return res.status(ok).json(products);
  }

  async show(req: Request, res: Response) {
    const { uuid } = req.params;

    const product = await productService.findOne({ uuid });

    return res.status(ok).json(product);
  }

  async create(req: Request, res: Response) {
    const { name, price, quantity } = req.body;

    const product = await productService.create({
      name,
      price,
      quantity,
    });

    return res.status(created).json({ message: 'Product created', product });
  }

  async update(req: Request, res: Response) {
    const { name, price, quantity } = req.body;
    const { uuid } = req.body;

    const product = await productService.update({
      uuid,
      name,
      price,
      quantity,
    });

    return res.status(ok).json({ message: 'Product updated', product });
  }

  async delete(req: Request, res: Response) {
    const { uuid } = req.params;

    const productDeleted = await productService.delete({ uuid });

    return res.status(ok).json({ message: 'Product deleted', productDeleted });
  }
}
