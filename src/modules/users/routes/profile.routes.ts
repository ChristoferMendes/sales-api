import { isAuthenticated } from '@shared/http/middlewares/isAuthenticated';
import { Router } from 'express';
import { ProfileController } from '@modules/users/controllers/profile.controller';
import { UserRepository } from '@modules/users/repositories/user.repository';
import { ProfileService } from '@modules/users/services/profile.service';
import { ProfileValidator } from '@modules/users/validators/profile.validator';

export const profileRouter = Router();

const profileService = new ProfileService(UserRepository);
const profileController = new ProfileController(profileService);

const { postValidator } = new ProfileValidator();

profileRouter.use(isAuthenticated);

profileRouter.put('/', postValidator(), profileController.update);
