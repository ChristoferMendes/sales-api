import { Status } from '@shared/classes/Status';
import { AppError } from '@shared/errors/AppError';
import { ProductRepository } from '../repository/product.repository';
import { RedisCache } from '@shared/cache/RedisCache';
import { Product } from '../entity/Product';
import { IProductService } from '../domain/services/IProductService';

interface IRequest {
  uuid: string;
  name: string;
  price: number;
  quantity: number;
}

const { conflict, notFound } = new Status();

const redisCache = new RedisCache();
export class ProductService implements IProductService {
  private cacheKey = 'sales-api-PRODUCT_LIST';

  async create({ name, price, quantity }: { name: string; price: number; quantity: number }) {
    const productExists = await ProductRepository.findByName(name);

    if (productExists) throw new AppError('There is already one product with this name', conflict);

    const product = ProductRepository.create({ name, price, quantity });

    await redisCache.invalidate(this.cacheKey);

    await ProductRepository.save(product);

    return product;
  }

  async update({ uuid, name, price, quantity }: IRequest) {
    const productExists = await ProductRepository.findByName(name);

    const product = await ProductRepository.findOneBy({ uuid });

    if (!product) throw new AppError('Product not found', notFound);

    if (productExists && name != product?.name) {
      throw new AppError('There is already one product with this name', conflict);
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await redisCache.invalidate(this.cacheKey);

    await ProductRepository.save(product);

    return product;
  }

  async delete({ uuid }: { uuid: string }) {
    const product = await ProductRepository.findOneBy({ uuid });

    if (!product) throw new AppError('Product not found', notFound);

    await redisCache.invalidate(this.cacheKey);

    await ProductRepository.remove(product);

    return product;
  }

  async findAll() {
    let products = await redisCache.recover<Product[]>(this.cacheKey);

    if (!products) {
      products = await ProductRepository.find();

      await redisCache.save(this.cacheKey, products);
    }

    return products;
  }

  async findOne({ uuid }: { uuid: string }) {
    const product = await ProductRepository.findOneBy({ uuid });

    if (!product) throw new AppError('Product not found', notFound);

    return product;
  }
}
