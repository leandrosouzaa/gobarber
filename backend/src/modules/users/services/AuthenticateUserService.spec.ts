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

   it('should not be able to authentincate with non existing user', async () => {
      const fakeUserRepository = new FakeUsersRepository();
      const fakeHashProvider = new FakeHashProvider();

      const authenticateUser = new AuthentincateUserService(
         fakeUserRepository,
         fakeHashProvider,
      );

      expect(
         authenticateUser.execute({
            email: 'john@doe.com',
            password: '123456',
         }),
      ).rejects.toBeInstanceOf(AppError);
   });

   it('should not be able to authentincate with wrong password', async () => {
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

      await createUser.execute({
         name: 'John Doe',
         email: 'john@doe.com',
         password: 'wrongPassword',
      });

      expect(
         authenticateUser.execute({
            email: 'john@doe.com',
            password: '123456',
         }),
      ).rejects.toBeInstanceOf(AppError);
   });
});
