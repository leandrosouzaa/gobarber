import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
   beforeEach(() => {
      fakeUserRepository = new FakeUsersRepository();
      fakeHashProvider = new FakeHashProvider();

      updateProfile = new UpdateProfileService(
         fakeUserRepository,
         fakeHashProvider,
      );
   });
   it('should be able to update the profile', async () => {
      const user = await fakeUserRepository.create({
         name: 'John Doe',
         email: 'john@doe.com',
         password: '123456',
      });

      const updatedUser = await updateProfile.execute({
         user_id: user.id,
         name: 'John Trê',
         email: 'john@tre.com',
      });

      expect(updatedUser.name).toBe('John Trê');
      expect(updatedUser.email).toBe('john@tre.com');
   });

   it('should be able to update avatar user from non existing user', async () => {
      await expect(
         updateProfile.execute({
            user_id: 'non-existing-user',
            name: 'John Trê',
            email: 'john@tre.com',
         }),
      ).rejects.toBeInstanceOf(AppError);
   });

   it('should not be able to change the email to another user email', async () => {
      await fakeUserRepository.create({
         name: 'John Doe',
         email: 'john@doe.com',
         password: '123456',
      });

      const user = await fakeUserRepository.create({
         name: 'John Trê',
         email: 'john@tre.com',
         password: '123123',
      });

      await expect(
         updateProfile.execute({
            user_id: user.id,
            email: 'john@doe.com',
            name: 'John',
         }),
      ).rejects.toBeInstanceOf(AppError);
   });

   it('should be able to update the password', async () => {
      const user = await fakeUserRepository.create({
         name: 'John Doe',
         email: 'john@doe.com',
         password: '123456',
      });

      const updatedUser = await updateProfile.execute({
         user_id: user.id,
         name: 'John Trê',
         email: 'john@tre.com',
         password: '123123',
         old_password: '123456',
      });

      expect(updatedUser.password).toBe('123123');
   });

   it('should not be able to update the password without old password', async () => {
      const user = await fakeUserRepository.create({
         name: 'John Doe',
         email: 'john@doe.com',
         password: '123456',
      });

      await expect(
         updateProfile.execute({
            user_id: user.id,
            name: 'John Trê',
            email: 'john@tre.com',
            password: '123123',
         }),
      ).rejects.toBeInstanceOf(AppError);
   });

   it('should not be able to update the password without wrong old password', async () => {
      const user = await fakeUserRepository.create({
         name: 'John Doe',
         email: 'john@doe.com',
         password: '123456',
      });

      await expect(
         updateProfile.execute({
            user_id: user.id,
            name: 'John Trê',
            email: 'john@tre.com',
            old_password: 'wrong-old-passowrd',
            password: '123123',
         }),
      ).rejects.toBeInstanceOf(AppError);
   });
});
