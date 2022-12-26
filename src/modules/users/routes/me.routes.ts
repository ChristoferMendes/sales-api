import { isAuthenticated } from '@shared/http/middlewares/isAuthenticated';
import { Router } from 'express';
import { UserRepository } from '../repositories/user.repository';
import { instanceToInstance } from 'class-transformer';

export const meRouter = Router();
meRouter.use(isAuthenticated);

meRouter.post('/', async (req, res) => {
  const { uuid } = req.user;

  const user = await UserRepository.findOneBy({ uuid });

  return res.status(200).json(instanceToInstance(user));
});
