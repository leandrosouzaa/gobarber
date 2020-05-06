import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

import AppError from '@shared/errors/AppError';

interface IRequest {
   name: string;
   email: string;
   password: string;
}

@injectable()
class CreateUserService {
   constructor(
      @inject('UsersRepository')
      private usersRepository: IUserRepository,

      @inject('HashProvider')
      private hashProvider: IHashProvider,
   ) {}

   public async execute({ name, email, password }: IRequest): Promise<User> {
      const checkUserExists = await this.usersRepository.findByEmail(email);

      if (checkUserExists) {
         throw new AppError('Email adress already used');
      }

      const hashedPassword = await this.hashProvider.generateHash(password);

      const user = await this.usersRepository.create({
         name,
         email,
         password: hashedPassword,
      });

      return user;
   }
}

export default CreateUserService;
