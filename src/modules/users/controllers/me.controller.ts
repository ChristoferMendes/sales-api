import { Status } from '@shared/classes/Status';
import { Request, Response } from 'express';
import { MeService } from '../services/me.service';

const meService = new MeService();
const { ok } = new Status();

export class MeController {
  public async execute(req: Request, res: Response) {
    const { uuid } = req.user;

    const user = await meService.execute({ uuid });

    return res.status(ok).json(user);
  }
}
