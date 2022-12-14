import { IProduct } from '../models/IProduct';
import { ICreateProduct } from './ICreateProduct';
import { IUpdateProduct } from './IUpdateProduct';

export interface IProductService {
  create({ name, price, quantity }: ICreateProduct): Promise<IProduct>;

  update({ uuid, name, price, quantity }: IUpdateProduct): Promise<IProduct | null>;

  delete({ uuid }: Pick<IProduct, 'uuid'>): Promise<IProduct>;

  findAll(): Promise<IProduct[] | null>;

  findOne({ uuid }: Pick<IProduct, 'uuid'>): Promise<IProduct>;
}
