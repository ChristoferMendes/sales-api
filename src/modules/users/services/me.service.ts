import { UserRepository } from '../repositories/user.repository';

export class MeService {
  public async execute({ uuid }: { uuid: string }) {
    const user = await UserRepository.findOneBy({ uuid });

    return user;
  }
}
