import { uuid } from 'uuidv4';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

class UsersRepository implements IUsersRepository {
   private users: User[] = [];

   public async findById(id: string): Promise<User | undefined> {
      const findUser = this.users.find(u => u.id === id);

      return findUser;
   }

   public async findByEmail(email: string): Promise<User | undefined> {
      const findUser = this.users.find(u => u.email === email);

      return findUser;
   }

   public async create(userData: ICreateUserDTO): Promise<User> {
      const user = new User();

      Object.assign(user, { id: uuid() }, userData);

      this.users.push(user);

      return user;
   }

   public async save(user: User): Promise<User> {
      const findIndex = this.users.findIndex(u => u.id === user.id);

      this.users[findIndex] = user;

      return user;
   }
}

export default UsersRepository;
