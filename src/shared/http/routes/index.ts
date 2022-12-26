import { Router } from 'express';
import { productsRouter } from '@modules/products/product.routes';
import { passwordRouter } from '@modules/users/routes/password.routes';
import { profileRouter } from '@modules/users/routes/profile.routes';
import { sessionsRouter } from '@modules/users/routes/session.routes';
import { userRouter } from '@modules/users/routes/user.routes';
import { orderRouter } from '@modules/orders/routes/order.routes';
import { customerRouter } from '@modules/customers/infra/http/routes/customer.routes';
import { meRouter } from '@modules/users/routes/me.routes';

export const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', userRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/customers', customerRouter);
routes.use('/orders', orderRouter);
routes.use('/me', meRouter);

routes.get('/', (req, res) => {
  return res.json({ message: 'Hello World!' });
});
