import { User } from '@modules/users/entities/User';
import { AppDataSource } from 'src/data-source';

export const UserRepository = AppDataSource.getRepository(User).extend({
  async findByName(name: string): Promise<User | null> {
    const user: User | null = await this.findOne({
      where: {
        name,
      },
    });

    return user;
  },
});
