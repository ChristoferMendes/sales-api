import 'reflect-metadata';
import { CreateProducts1667743685152 } from './migration/1667743685152-CreateProducts';
import { DataSource } from 'typeorm';
import { Product } from './modules/products/entity/Product';
import { CreateUsers1668915728058 } from './migration/1668915728058-CreateUsers';
import { User } from './modules/users/entities/User';
import { CreateUsersToken1668998432783 } from './migration/1668998432783-CreateUsersToken';
import { UserToken } from './modules/users/entities/UserToken';
import { CreateCustomers1669156870116 } from './migration/1669156870116-CreateCustomers';
import { CreateOrders1669164111602 } from './migration/1669164111602-CreateOrders';
import { AddCustomerUuidToOrders1669164483700 } from './migration/1669164483700-AddCustomerUuidToOrders';
import { CreateOrdersProducts1669164958114 } from './migration/1669164958114-CreateOrdersProducts';
import { AddProductUuidToOrdersProducts1669165401457 } from './migration/1669165401457-AddProductUuidToOrdersProducts';
import { AddOrderUuidToOrdersProducts1669165208892 } from './migration/1669165208892-AddOrderUuidToOrdersProducts';
import { Order } from '@modules/orders/entities/Order';
import { OrdersProducts } from '@modules/orders/entities/OrdersProducts';
import { Customer } from '@modules/customers/infra/typeorm/entities/Customer';
import { AddDescriptionAndImageUrlToProduct1673265440933 } from './migration/1673265440933-AddDescriptionAndImageUrlToProduct';
import { AddNullToImageUrlColumnInProducts1673265895897 } from './migration/1673265895897-AddNullToImageUrlColumnInProducts';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'artie',
  password: '31415',
  database: 'salesapi-db',
  synchronize: true,
  logging: false,
  entities: [Product, User, UserToken, Customer, Order, OrdersProducts],
  migrations: [
    CreateProducts1667743685152,
    CreateUsers1668915728058,
    CreateUsersToken1668998432783,
    CreateCustomers1669156870116,
    CreateOrders1669164111602,
    CreateOrdersProducts1669164958114,
    AddCustomerUuidToOrders1669164483700,
    AddProductUuidToOrdersProducts1669165401457,
    AddOrderUuidToOrdersProducts1669165208892,
    AddDescriptionAndImageUrlToProduct1673265440933,
    AddNullToImageUrlColumnInProducts1673265895897,
  ],
  subscribers: [],
});
