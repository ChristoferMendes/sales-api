import { AppDataSource } from 'data-source';
import { UserToken } from '@modules/users/entities/UserToken';

export const UserTokenRepository = AppDataSource.getRepository(UserToken).extend({
  async generate(user_uuid: string): Promise<UserToken> {
    const userToken = this.create({ user_uuid });

    await this.save(userToken);

    return userToken;
  },
});
