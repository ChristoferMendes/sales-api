import { AppDataSource } from 'data-source';
import { Product } from '@modules/products/entity/Product';
import { In } from 'typeorm';

interface IFindProducts {
  uuid: string;
}

export const ProductRepository = AppDataSource.getRepository(Product).extend({
  async findByName(name: string): Promise<Product | undefined> {
    const product: Product = await this.findOne({
      where: {
        name,
      },
    });

    return product;
  },

  async findAllByUuids(products: IFindProducts[]) {
    const productsUuids = products.map((item) => item.uuid);

    const existsProducts: Product[] = await this.find({
      where: {
        uuid: In(productsUuids),
      },
    });

    return existsProducts;
  },
});
