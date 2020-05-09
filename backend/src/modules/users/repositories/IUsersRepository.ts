import User from '@modules/users/infra/typeorm/entities/User';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProviders from '../dtos/IFindAllProvidersDTO';

export default interface IUsersRepository {
   findById(id: string): Promise<User | undefined>;
   findByEmail(email: string): Promise<User | undefined>;
   create(data: ICreateUserDTO): Promise<User>;
   save(user: User): Promise<User>;
   findAllProviders(except_user_id?: IFindAllProviders): Promise<User[]>;
}
