import { Status } from '@shared/classes/Status';
import { Request, Response } from 'express';
import { UserTokenService } from '@modules/users/services/user.token.service';

const userTokenService = new UserTokenService();
const { ok } = new Status();

export class UserTokenController {
  public readonly userTokenService: UserTokenService;

  public async forgotPassword(req: Request, res: Response) {
    const { email } = req.body;

    const { url } = await userTokenService.sendForgotPasswordEmail({ email });

    return res.status(ok).json({ message: 'E-mail to reset password sended', etherealLink: url });
  }

  public async resetPassword(req: Request, res: Response) {
    const { password, token } = req.body;

    await userTokenService.resetPassword({ password, token });

    return res.status(ok).json({ message: 'Password reseted!' });
  }
}
