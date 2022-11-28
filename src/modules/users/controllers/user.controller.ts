import { Status } from '@shared/classes/Status';
import { Request, Response } from 'express';
import { UserService } from '@modules/users/services/user.service';
import { instanceToInstance } from 'class-transformer';

const { ok, created } = new Status();

export class UserController {
  constructor(private readonly userService: UserService) {}

  index = async (req: Request, res: Response) => {
    const users = await this.userService.findAll();

    return res.status(ok).json(instanceToInstance(users));
  };

  show = async (req: Request, res: Response) => {
    const { uuid } = req.params;
    const user = await this.userService.findOne({ uuid });

    return res.status(ok).json(instanceToInstance(user));
  };

  create = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const user = await this.userService.create({ name, email, password });

    return res.status(created).json(instanceToInstance(user));
  };

  updateAvatar = async (req: Request, res: Response) => {
    const user = await this.userService.updateUserAvatar({
      uuid: req.user.uuid,
      file: req.file.filename,
    });

    return res.status(ok).json(instanceToInstance(user));
  };
}
