import { Status } from '@shared/classes/Status';
import { AppError } from '@shared/errors/AppError';
import { UserRepository } from '@modules/users/repositories/user.repository';
import { hash, compare } from 'bcryptjs';

const { notFound, conflict } = new Status();
export class ProfileService {
  constructor(private readonly userRepository: typeof UserRepository) {}

  updateProfile = async ({
    uuid,
    name,
    email,
    password,
    old_password,
  }: {
    uuid: string;
    name?: string;
    email?: string;
    password?: string;
    old_password?: string;
  }) => {
    const user = await this.userRepository.findOneBy({ uuid });

    if (!user) throw new AppError('User not found', notFound);

    const userUpdateEmail = await this.userRepository.findOneBy({ email });

    if (userUpdateEmail && userUpdateEmail.uuid !== user.uuid) {
      throw new AppError('There is already one user with this email', conflict);
    }

    if (password && !old_password) throw new AppError('Old password is required', notFound);

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) throw new AppError('Old password does not match.', notFound);

      user.password = await hash(password, 8);
    }

    const [initalName, initialEmail] = [user.name, user.email];

    user.name = name ?? initalName;
    user.email = email ?? initialEmail;

    await this.userRepository.save(user);

    return user;
  };
}
