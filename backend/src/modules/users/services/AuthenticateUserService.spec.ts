import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import AuthentincateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
   it('should be able to authentincate', async () => {
      const fakeUserRepository = new FakeUsersRepository();
      const fakeHashProvider = new FakeHashProvider();

      const authenticateUser = new AuthentincateUserService(
         fakeUserRepository,
         fakeHashProvider,
      );
      const createUser = new CreateUserService(
         fakeUserRepository,
         fakeHashProvider,
      );

      const user = await createUser.execute({
         name: 'John Doe',
         email: 'john@doe.com',
         password: '123456',
      });

      const response = await authenticateUser.execute({
         email: 'john@doe.com',
         password: '123456',
      });

      expect(response).toHaveProperty('token');
      expect(response.user).toEqual(user);
   });
});
