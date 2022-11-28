import { Status } from '@shared/classes/Status';
import { AppError } from '@shared/errors/AppError';
import { Request, Response } from 'express';
import { ProfileService } from '@modules/users/services/profile.service';
import { instanceToInstance } from 'class-transformer';

const { ok, notFound } = new Status();

export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  update = async (req: Request, res: Response) => {
    const { uuid } = req.user;
    const { name, email, password, old_password } = req.body;
    const isReqEmpty = Object.keys(req.body).length == 0;

    if (isReqEmpty) throw new AppError('At least name or email must be specified', notFound);

    const user = await this.profileService.updateProfile({
      uuid,
      name,
      email,
      password,
      old_password,
    });

    return res.status(ok).json(instanceToInstance(user));
  };
}
