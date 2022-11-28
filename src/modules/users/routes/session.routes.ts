import { Router } from 'express';
import { SessionController } from '@modules/users/controllers/session.controller';
import { SessionValidator } from '@modules/users/validators/session.validator';

export const sessionsRouter = Router();
const sessionsController = new SessionController();
const { postValidator } = new SessionValidator();

sessionsRouter.post('/', postValidator(), sessionsController.create);
