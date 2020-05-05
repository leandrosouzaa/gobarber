import { hash } from 'bcryptjs';

import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUsersRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
   name: string;
   email: string;
   password: string;
}

class CreateUserService {
   constructor(private usersRepository: IUserRepository) {}

   public async execute({ name, email, password }: IRequest): Promise<User> {
      const checkUserExists = await this.usersRepository.findByEmail(email);

      if (checkUserExists) {
         throw new AppError('Email adress already used');
      }

      const hashedPassword = await hash(password, 8);

      const user = await this.usersRepository.create({
         name,
         email,
         password: hashedPassword,
      });

      return user;
   }
}

export default CreateUserService;
