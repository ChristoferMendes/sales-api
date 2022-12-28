import { Status } from '@shared/classes/Status';
import { Request, Response } from 'express';
import { UserEmailService } from '../services/user_email.service';

const userEmailService = new UserEmailService();
const { ok } = new Status();

export class UserEmailController {
  async execute(req: Request, res: Response) {
    const { email } = req.body;

    const user = await userEmailService.execute({ email });
    console.log(user);

    return res.status(ok).json(user);
  }
}
