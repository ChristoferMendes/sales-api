import { Status } from '@shared/classes/Status';
import { AppError } from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { UserRepository } from '@modules/users/repositories/user.repository';
import path from 'path';
import uploadConfig from '@config/upload';
import fs from 'fs';

interface UserProperties {
  name: string;
  email: string;
  password: string;
}

const { notFound, conflict } = new Status();

export class UserService {
  async create({ name, email, password }: UserProperties) {
    const emailExist = await UserRepository.findOneBy({ email });

    if (emailExist) throw new AppError('This email is already in use', conflict);

    const hashedPassword = await hash(password, 8);

    const user = UserRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await UserRepository.save(user);
    return user;
  }

  async findAll() {
    const users = await UserRepository.find();

    return users;
  }

  async findOne({ uuid }: { uuid: string }) {
    const user = await UserRepository.findOneBy({ uuid });

    if (!user) throw new AppError('This user does not exist', notFound);

    return user;
  }

  async updateUserAvatar({ uuid, file }: { uuid: string; file: string | undefined }) {
    const user = await UserRepository.findOneBy({ uuid });
    if (!user) throw new AppError('User not found', notFound);

    if (!file) throw new AppError('Please, send a file', notFound);

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) await fs.promises.unlink(userAvatarFilePath);
    }

    user.avatar = file;

    await UserRepository.save(user);

    return user;
  }

  async delete({ uuid }: { uuid: string }) {
    const user = await UserRepository.findOneBy({ uuid });

    if (!user) throw new AppError('User not found', conflict);

    await UserRepository.remove(user);

    return user;
  }

  async findOneByEmail({ email }: { email: string }) {
    const user = await UserRepository.findOneBy({ email });

    return user;
  }
}
