import type { IOrderService } from '../domain/services/IOrderService';
import type { IOrderCreate } from '../domain/models/IOrderCreate';
import { Status } from '@shared/classes/Status';
import { AppError } from '@shared/errors/AppError';
import { ProductRepository } from '@modules/products/repository/product.repository';
import { OrderRepository } from '../repositories/OrderRepository';
import { CustomerRepository } from '@modules/customers/infra/typeorm/repositories/CustomerRepository';
import { IProduct } from '@modules/products/domain/models/IProduct';

const { notFound, conflict } = new Status();
export class OrderService implements IOrderService {
  public async create({ customer_uuid, products }: IOrderCreate) {
    const customerExists = await this.fetchCustomer({ uuid: customer_uuid });

    const existsProducts = await this.fetchProducts({ products });

    await this.checkInexistentProducts({ existsProducts, products });

    await this.checkQuantityAvailable({ products, existsProducts });

    await this.checkRequestQuantity({ products });

    const serializedProducts = products.map((product) => ({
      product_uuid: product.uuid,
      quantity: product.quantity,
      price: existsProducts.filter((p) => p.uuid === product.uuid)[0].price * product.quantity,
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

  private async fetchCustomer({ uuid }: { uuid: string }) {
    const customer = await CustomerRepository.findOneBy({ uuid });

    if (!customer) throw new AppError('Customer not found', notFound);

    return customer;
  }

  private async fetchProducts({ products }: { products: IProduct[] }) {
    const allProducts = await ProductRepository.findAllByUuids(products);

    if (!allProducts.length) {
      throw new AppError('Could not find any products with the given ids.', notFound);
    }

    return allProducts;
  }

  private async checkInexistentProducts({
    existsProducts,
    products,
  }: {
    existsProducts: IProduct[];
    products: IProduct[];
  }) {
    const existsProductsUuids = existsProducts.map((item) => item.uuid);

    const checkInexistentProducts = products.filter((item) => !existsProductsUuids.includes(item.uuid));

    if (checkInexistentProducts.length) {
      throw new AppError(`Could not find product ${checkInexistentProducts[0].uuid}`, notFound);
    }
  }

  private async checkRequestQuantity({ products }: { products: IProduct[] }) {
    const requestProductWithZeroQuantity = products.filter((item) => item.quantity == 0);

    const productsToBeFetched = requestProductWithZeroQuantity.length > 0 ? requestProductWithZeroQuantity : products;

    const allProducts = await this.fetchProducts({ products: productsToBeFetched });

    if (requestProductWithZeroQuantity.length > 0) {
      throw new AppError(`You could not order ${allProducts[0].name} with 0 quantity`, conflict);
    }
  }

  private async checkQuantityAvailable({
    products,
    existsProducts,
  }: {
    products: IProduct[];
    existsProducts: IProduct[];
  }) {
    const quantityAvailable = products.filter(
      (product) => existsProducts.filter((p) => p.uuid === product.uuid)[0].quantity < product.quantity,
    );

    if (quantityAvailable.length) {
      throw new AppError(
        `The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].uuid}`,
        notFound,
      );
    }
  }
}
