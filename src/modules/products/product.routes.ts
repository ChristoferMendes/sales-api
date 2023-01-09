import { isAuthenticated } from '@shared/http/middlewares/isAuthenticated';
import { Router } from 'express';
import multer from 'multer';
import { ProductsController } from './product.controller';
import { ProductValidator } from './product.validator';
import uploadConfig from '@config/upload';
export const productsRouter = Router();

const { getValidator, postValidator, putValidator } = new ProductValidator();
const productController = new ProductsController();
const upload = multer(uploadConfig);
productsRouter.use(isAuthenticated);

productsRouter.get('/', productController.index);

productsRouter.get('/:uuid', getValidator(), productController.show);

productsRouter.post('/', [postValidator(), isAuthenticated], productController.create);

productsRouter.put('/:uuid', [putValidator(), isAuthenticated], productController.update);

productsRouter.delete('/:uuid', [getValidator(), isAuthenticated], productController.delete);

productsRouter.patch('/image/:uuid', upload.single('image'), productController.imageUpdate);
