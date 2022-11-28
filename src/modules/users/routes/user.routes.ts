import { Router } from 'express';
import { UserController } from '@modules/users/controllers/user.controller';
import { isAuthenticated } from '@shared/http/middlewares/isAuthenticated';
import { UserValidator } from '@modules/users/validators/user.validator';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { UserService } from '@modules/users/services/user.service';

export const userRouter = Router();
const upload = multer(uploadConfig);

const { postValidator, getValidator } = new UserValidator();
const userService = new UserService();
const userController = new UserController(userService);

userRouter.get('/', isAuthenticated, userController.index);
userRouter.get('/:uuid', [getValidator(), isAuthenticated], userController.show);
userRouter.post('/', postValidator(), userController.create);

userRouter.patch('/avatar', isAuthenticated, upload.single('avatar'), userController.updateAvatar);
