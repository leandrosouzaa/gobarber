import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import CreateUserService from './CreateUserService';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateUser', () => {
   beforeEach(() => {
      fakeUserRepository = new FakeUsersRepository();
      fakeHashProvider = new FakeHashProvider();
      fakeCacheProvider = new FakeCacheProvider();

      createUser = new CreateUserService(
         fakeUserRepository,
         fakeHashProvider,
         fakeCacheProvider,
      );
   });

   it('should be able to create a new user', async () => {
      const user = await createUser.execute({
         name: 'John Doe',
         email: 'john@doe.com',
         password: '123456',
      });

      expect(user).toHaveProperty('id');
   });

   it('should not be able to create two users with same email ', async () => {
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
