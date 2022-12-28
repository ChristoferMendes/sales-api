import { Status } from '@shared/classes/Status';
import { AppError } from '@shared/errors/AppError';
import { Request, Response } from 'express';
import { UserEmailService } from '../services/user_email.service';

const userEmailService = new UserEmailService();
const { ok, notFound } = new Status();

export class UserEmailController {
  async execute(req: Request, res: Response) {
    const { email } = req.body;

    const user = await userEmailService.execute({ email });

    if (!user) throw new AppError('This user does not exist', notFound);

    return res.status(ok).json(user);
  }
}
