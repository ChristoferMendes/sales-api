import type { IOrderService } from '../domain/services/IOrderService';
import type { IOrderCreate } from '../domain/models/IOrderCreate';
import { Status } from '@shared/classes/Status';
import { AppError } from '@shared/errors/AppError';
import { ProductRepository } from '@modules/products/repository/product.repository';
import { OrderRepository } from '../repositories/OrderRepository';
import { CustomerRepository } from '@modules/customers/infra/typeorm/repositories/CustomerRepository';

const { notFound } = new Status();
export class OrderService implements IOrderService {
  public async create({ customer_uuid, products }: IOrderCreate) {
    const customerExists = await CustomerRepository.findOneBy({ uuid: customer_uuid });

    if (!customerExists) throw new AppError('Could not find any customer with the given id.', notFound);

    const existsProducts = await ProductRepository.findAllByUuids(products);

    if (!existsProducts.length) {
      throw new AppError('Could not find any products with the given ids.', notFound);
    }

    const existsProductsUuids = existsProducts.map((item) => item.uuid);

    const checkInexistentProducts = products.filter((item) => !existsProductsUuids.includes(item.uuid));

    if (checkInexistentProducts.length) {
      throw new AppError(`Could not find product ${checkInexistentProducts[0]}`, notFound);
    }

    const quantityAvailable = products.filter(
      (product) => existsProducts.filter((p) => p.uuid === product.uuid)[0].quantity < product.quantity,
    );

    if (quantityAvailable.length) {
      throw new AppError(
        `The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].uuid}`,
        notFound,
      );
    }

    const serializedProducts = products.map((product) => ({
      product_uuid: product.uuid,
      quantity: product.quantity,
      price: existsProducts.filter((p) => p.uuid === product.uuid)[0].price,
    }));

    const order = await OrderRepository.createOrder({
      customer: customerExists,
      products: serializedProducts,
    });

    const { order_products } = order;

    const updatedProductQuantity = order_products.map((product) => ({
      uuid: product.product_uuid,
      quantity: existsProducts.filter((p) => p.uuid === product.product_uuid)[0].quantity - product.quantity,
    }));

    await ProductRepository.save(updatedProductQuantity);

    return order;
  }

  public async showOrder({ uuid }: { uuid: string }) {
    const order = await OrderRepository.findOneBy({ uuid });

    if (!order) throw new AppError('Order not found', 404);

    return order;
  }
}
