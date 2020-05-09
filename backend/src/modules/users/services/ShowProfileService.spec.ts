import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import ShowProfileService from './ShowProfileService';

let fakeUserRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
   beforeEach(() => {
      fakeUserRepository = new FakeUsersRepository();

      showProfile = new ShowProfileService(fakeUserRepository);
   });
   it('should be able to show the profile', async () => {
      const user = await fakeUserRepository.create({
         name: 'John Doe',
         email: 'john@doe.com',
         password: '123456',
      });

      const profile = await showProfile.execute({
         user_id: user.id,
      });

      expect(profile.name).toBe('John Doe');
      expect(profile.email).toBe('john@doe.com');
   });

   it('should not be able to show the profile from non-existing user', async () => {
      await expect(
         showProfile.execute({
            user_id: 'non-existing-user',
         }),
      ).rejects.toBeInstanceOf(AppError);
   });
});
