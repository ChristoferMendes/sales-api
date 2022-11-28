import { Status } from '@shared/classes/Status';
import { AppError } from '@shared/errors/AppError';
import { UserRepository } from '@modules/users/repositories/user.repository';
import { UserTokenRepository } from '@modules/users/repositories/user.token.repository';
import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcryptjs';
import { EtherealMail } from '@config/mail/Ethereal.mail';
import path from 'path';

const { notFound, unauthenticated } = new Status();

export class UserTokenService {
  public async sendForgotPasswordEmail({ email }: { email: string }) {
    const WEB_URL = process.env.APP_WEB_UR;
    const user = await UserRepository.findOneBy({ email });

    if (!user) throw new AppError('User not found.', notFound);

    const { token } = await UserTokenRepository.generate(user.uuid);

    const forgotPasswordTemplate = path.resolve(__dirname, '../views/forgot_password.hbs');

    const { url } = await EtherealMail.sendMail({
      to: {
        name: user.name,
        email,
      },
      subject: '[SALES API] Password retrieve',
      templateData: {
        variables: {
          name: user.name,
          link: `${WEB_URL}/reset_password?token=${token}`,
        },
        file: forgotPasswordTemplate,
      },
    });

    return { url };
  }

  public async resetPassword({ token, password }: { token: string; password: string }) {
    const userToken = await UserTokenRepository.findOneBy({ token });

    if (!userToken) throw new AppError('User token not found', notFound);

    const user = await UserRepository.findOneBy({ uuid: userToken.user_uuid });

    if (!user) throw new AppError('User not found', notFound);

    const tokenCreatedAt = userToken.created_at;
    const hoursToBeAdded = 2;
    const compareDate = addHours(tokenCreatedAt, hoursToBeAdded);
    const alreadyPassedTwoHours = isAfter(Date.now(), compareDate);

    if (alreadyPassedTwoHours) throw new AppError('Token expired', unauthenticated);

    user.password = await hash(password, 8);

    await UserRepository.save(user);
  }
}
