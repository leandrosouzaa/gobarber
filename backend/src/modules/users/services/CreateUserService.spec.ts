import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
   it('should be able to create a new user', async () => {
      const fakeUserRepository = new FakeUsersRepository();
      const fakeHashProvider = new FakeHashProvider();

      const createUser = new CreateUserService(
         fakeUserRepository,
         fakeHashProvider,
      );

      const user = await createUser.execute({
         name: 'John Doe',
         email: 'john@doe.com',
         password: '123456',
      });

      expect(user).toHaveProperty('id');
   });

   it('should not be able to create two users with same email ', async () => {
      const fakeUserRepository = new FakeUsersRepository();
      const fakeHashProvider = new FakeHashProvider();

      const createUser = new CreateUserService(
         fakeUserRepository,
         fakeHashProvider,
      );

      await createUser.execute({
         name: 'John Doe',
         email: 'john@doe.com',
         password: '123456',
      });

      await expect(
         createUser.execute({
            name: 'John Doe',
            email: 'john@doe.com',
            password: '123456',
         }),
      ).rejects.toBeInstanceOf(AppError);
   });
});
