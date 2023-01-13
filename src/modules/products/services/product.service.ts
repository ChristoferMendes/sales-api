import { badRequest, conflict, notFound } from '@shared/classes/Status';
import { AppError } from '@shared/errors/AppError';
import { ProductRepository } from '../repository/product.repository';
import { RedisCache } from '@shared/cache/RedisCache';
import { Product } from '../entity/Product';
import { IProductService } from '../domain/services/IProductService';
import path from 'path';
import fs from 'fs';
import uploadConfig from '@config/upload';
import { CategoryEnum } from '../entity/category.enum';

interface IRequest {
  uuid: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  category?: CategoryEnum;
}

const redisCache = new RedisCache();
export class ProductService implements IProductService {
  private cacheKey = 'sales-api-PRODUCT_LIST';

  async create({
    name,
    price,
    quantity,
    description,
    category,
  }: {
    name: string;
    price: number;
    quantity: number;
    description: string;
    category?: CategoryEnum;
  }) {
    const productExists = await ProductRepository.findByName(name);

    if (productExists) throw new AppError('There is already one product with this name', conflict);

    const product = ProductRepository.create({ name, price, quantity, description, category });

    await redisCache.invalidate(this.cacheKey);

    await ProductRepository.save(product);

    return product;
  }

  async update({ uuid, name, price, quantity, description, category }: IRequest) {
    const productExists = await ProductRepository.findByName(name);

    const product = await ProductRepository.findOneBy({ uuid });

    if (!product) throw new AppError('Product not found', notFound);

    if (productExists && name === product.name) {
      throw new AppError('There is already one product with this name', conflict);
    }

    product.name = name ?? product.name;
    product.price = price ?? product.price;
    product.quantity = quantity ?? product.quantity;
    product.description = description ?? product.description;
    product.category = category ?? product.category;

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

  async imageUpdate({ uuid, file }: { uuid: string; file: string | undefined }) {
    const product = await ProductRepository.findOneBy({ uuid });

    if (!product) throw new AppError('Product not found', notFound);

    if (!file) throw new AppError('Please, send a file', badRequest);

    const domain = process.env.APP_API_URL;
    const endpoint = '/files';
    const url = domain + endpoint;
    const imageUrl = url + `/${file}`;

    const imageExists = product.image_url;

    if (imageExists) {
      const [, productImageName] = product.image_url?.split(url) ?? [];

      const productImageFilePath = path.join(uploadConfig.directory, productImageName);
      const productImageFileExists = await fs.promises.stat(productImageFilePath);

      if (productImageFileExists) await fs.promises.unlink(productImageFilePath);
    }

    product.image_url = imageUrl;
    await ProductRepository.save(product);

    return product;
  }
}
