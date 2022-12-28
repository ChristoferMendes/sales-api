import { Status } from '@shared/classes/Status';
import { Request, Response } from 'express';
import { UserEmailService } from '../services/user_email.service';

const userEmailService = new UserEmailService();
const { ok, notFound } = new Status();

export class UserEmailController {
  async execute(req: Request, res: Response) {
    const { email } = req.body;

    const user = await userEmailService.execute({ email });

    if (!user) {
      return res.status(notFound).json({
        message: 'This user does not exist',
      });
    }

    return res.status(ok).json(user);
  }
}
