import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUserRepository: FakeUsersRepository;
let listProviders: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;

describe('ShowProfile', () => {
   beforeEach(() => {
      fakeUserRepository = new FakeUsersRepository();
      fakeCacheProvider = new FakeCacheProvider();

      listProviders = new ListProvidersService(
         fakeUserRepository,
         fakeCacheProvider,
      );
   });
   it('should be able to list the providers', async () => {
      const user1 = await fakeUserRepository.create({
         name: 'John Doe',
         email: 'john@doe.com',
         password: '123456',
      });

      const user2 = await fakeUserRepository.create({
         name: 'John Trê',
         email: 'john@tre.com',
         password: '123456',
      });

      const loggedUser = await fakeUserRepository.create({
         name: 'John Quar',
         email: 'john@quart.com',
         password: '123456',
      });

      const providers = await listProviders.execute({ user_id: loggedUser.id });

      expect(providers).toEqual([user1, user2]);
   });
});
