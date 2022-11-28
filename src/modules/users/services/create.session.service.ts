import { Status } from '@shared/classes/Status';
import { AppError } from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { User } from '@modules/users/entities/User';
import { UserRepository } from '@modules/users/repositories/user.repository';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

const { unauthenticated } = new Status();
const { secret, expiresIn } = authConfig.jwt;

export class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await UserRepository.findOneBy({ email });

    if (!user) throw new AppError('This email is not registered', unauthenticated);

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) throw new AppError('Incorrect password combination', unauthenticated);

    const token = sign({}, secret, {
      subject: user.uuid,
      expiresIn,
    });

    return { user, token };
  }
}
