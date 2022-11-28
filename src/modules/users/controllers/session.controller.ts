import { Status } from '@shared/classes/Status';
import { Request, Response } from 'express';
import { CreateSessionService } from '@modules/users/services/create.session.service';
import { instanceToInstance } from 'class-transformer';

const { ok } = new Status();

export class SessionController {
  public async create(req: Request, res: Response) {
    const { email, password } = req.body;

    const createSession = new CreateSessionService();

    const { user, token } = await createSession.execute({
      email,
      password,
    });

    const responseMessage = {
      message: 'Session created with succes',
      token,
      user: instanceToInstance(user),
    };

    return res.status(ok).json(responseMessage);
  }
}
