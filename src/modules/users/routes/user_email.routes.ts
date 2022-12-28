import { Router } from 'express';
import { UserEmailController } from '../controllers/user_email.controller';
import { UserEmailValidator } from '../validators/user_email.validator';

export const userEmailRouter = Router();

const userEmailController = new UserEmailController();
const { postValidator } = new UserEmailValidator();

userEmailRouter.post('/', postValidator(), userEmailController.execute);
