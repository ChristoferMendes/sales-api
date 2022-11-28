import { AppDataSource } from 'data-source';
import { User } from '@modules/users/entities/User';

export const UserRepository = AppDataSource.getRepository(User).extend({
  async findByName(name: string): Promise<User | undefined> {
    const user: User = await this.findOne({
      where: {
        name,
      },
    });

    return user;
  },
});
