import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

interface IRequest {
   user_id: string;
   name: string;
   email: string;
   password?: string;
   old_password?: string;
}

@injectable()
class UpdateProfileService {
   constructor(
      @inject('UsersRepository') private usersRepository: IUsersRepository,
      @inject('HashProvider') private hashProvider: IHashProvider,
   ) {}

   public async execute({
      user_id,
      name,
      email,
      password,
      old_password,
   }: IRequest): Promise<User> {
      const user = await this.usersRepository.findById(user_id);

      if (!user) {
         throw new AppError('User not found');
      }

      user.name = name;
      user.email = email;

      const userWithUpdatedEmail = await this.usersRepository.findByEmail(
         email,
      );

      if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
         throw new AppError('E-mail already in use.');
      }

      if (password && !old_password) {
         throw new AppError(
            'You need to inform the old password to set a new password.',
         );
      }

      if (password && old_password) {
         const checkOldPassword = await this.hashProvider.compareHash(
            old_password,
            user.password,
         );

         if (!checkOldPassword) {
            throw new AppError('Old password does not match.');
         }
      }

      if (password) {
         user.password = await this.hashProvider.generateHash(password);
      }

      return this.usersRepository.save(user);
   }
}

export default UpdateProfileService;
