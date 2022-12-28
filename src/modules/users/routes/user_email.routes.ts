import { Router } from 'express';
import { UserEmailController } from '../controllers/user_email.controller';

export const userEmailRouter = Router();

const userEmailController = new UserEmailController();

userEmailRouter.get('/', userEmailController.execute);
