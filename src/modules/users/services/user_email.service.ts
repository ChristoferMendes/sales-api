import { UserRepository } from '../repositories/user.repository';

export class UserEmailService {
  async execute({ email }: { email: string }) {
    const user = await UserRepository.findOneBy({ email });

    return user;
  }
}
