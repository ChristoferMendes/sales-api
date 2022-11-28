import { isAuthenticated } from '@shared/http/middlewares/isAuthenticated';
import { Router } from 'express';
import { CustomerController } from '../controllers/customer.controller';
import { CustomerValidator } from '../validators/customer.validator';

export const customerRouter = Router();

const { getValidator, postValidator, putValidator } = new CustomerValidator();
const productController = new CustomerController();

customerRouter.use(isAuthenticated);

customerRouter.get('/', productController.index);

customerRouter.get('/:uuid', getValidator(), productController.show);

customerRouter.post('/', postValidator(), productController.create);

customerRouter.put('/:uuid', putValidator(), productController.update);

customerRouter.delete('/:uuid', getValidator(), productController.delete);
