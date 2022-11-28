import { Router } from 'express';
import { UserTokenController } from '@modules/users/controllers/user.token.controller';
import { ForgotValidator } from '@modules/users/validators/forgot.validator';

export const passwordRouter = Router();
const sessionsController = new UserTokenController();
const { emailForgotValidator, passwordResetValidator } = new ForgotValidator();

passwordRouter.post('/forgot', emailForgotValidator(), sessionsController.forgotPassword);
passwordRouter.post('/reset', passwordResetValidator(), sessionsController.resetPassword);
