import { isAuthenticated } from '@shared/http/middlewares/isAuthenticated';
import { Router } from 'express';
import { OrderController } from '../controllers/order.controller';
import { OrderValidator } from '../validators/order.validator';

export const orderRouter = Router();

const { getValidator, postValidator } = new OrderValidator();
const orderController = new OrderController();

orderRouter.use(isAuthenticated);

orderRouter.get('/:uuid', getValidator(), orderController.show);

orderRouter.post('/', postValidator(), orderController.create);
