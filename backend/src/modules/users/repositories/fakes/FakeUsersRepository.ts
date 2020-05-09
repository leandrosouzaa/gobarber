import { uuid } from 'uuidv4';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProviders from '@modules/users/dtos/IFindAllProvidersDTO';

class FakeUsersRepository implements IUsersRepository {
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

   public async findAllProviders({
      except_user_id,
   }: IFindAllProviders): Promise<User[]> {
      const providers = this.users.filter(u => u.id !== except_user_id);

      return providers;
   }
}

export default FakeUsersRepository;
