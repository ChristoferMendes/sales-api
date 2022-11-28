import { Product } from '@modules/products/entity/Product';
import { AppDataSource } from 'src/data-source';
import { In } from 'typeorm';

interface IFindProducts {
  uuid: string;
}

export const ProductRepository = AppDataSource.getRepository(Product).extend({
  async findByName(name: string): Promise<Product | null> {
    const product: Product | null = await this.findOne({
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
