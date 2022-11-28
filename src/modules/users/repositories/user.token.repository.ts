import { UserToken } from '@modules/users/entities/UserToken';
import { AppDataSource } from 'src/data-source';

export const UserTokenRepository = AppDataSource.getRepository(UserToken).extend({
  async generate(user_uuid: string): Promise<UserToken> {
    const userToken = this.create({ user_uuid });

    await this.save(userToken);

    return userToken;
  },
});
