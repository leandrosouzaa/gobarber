import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
   it('should be able to update avatar user', async () => {
      const fakeUserRepository = new FakeUsersRepository();
      const fakeStorageProvider = new FakeStorageProvider();

      const updateUserAvatar = new UpdateUserAvatarService(
         fakeUserRepository,
         fakeStorageProvider,
      );

      const user = await fakeUserRepository.create({
         name: 'John Doe',
         email: 'john@doe.com',
         password: '123456',
      });

      await updateUserAvatar.execute({
         user_id: user.id,
         avatarFilename: 'avatar.jpg',
      });

      expect(user.avatar).toBe('avatar.jpg');
   });
   it('should be able to update avatar user from non existing user', async () => {
      const fakeUserRepository = new FakeUsersRepository();
      const fakeStorageProvider = new FakeStorageProvider();

      const updateUserAvatar = new UpdateUserAvatarService(
         fakeUserRepository,
         fakeStorageProvider,
      );

      await expect(
         updateUserAvatar.execute({
            user_id: 'non-existing-user',
            avatarFilename: 'avatar.jpg',
         }),
      ).rejects.toBeInstanceOf(AppError);
   });

   it('should be delete old avatar when updating new one', async () => {
      const fakeUserRepository = new FakeUsersRepository();
      const fakeStorageProvider = new FakeStorageProvider();

      const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

      const updateUserAvatar = new UpdateUserAvatarService(
         fakeUserRepository,
         fakeStorageProvider,
      );

      const user = await fakeUserRepository.create({
         name: 'John Doe',
         email: 'john@doe.com',
         password: '123456',
      });

      await updateUserAvatar.execute({
         user_id: user.id,
         avatarFilename: 'avatar.jpg',
      });

      await updateUserAvatar.execute({
         user_id: user.id,
         avatarFilename: 'avatar.jpg',
      });

      expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');

      expect(user.avatar).toBe('avatar.jpg');
   });
});
