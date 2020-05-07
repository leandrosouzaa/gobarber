import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

describe('SendForgotPasswordEmail', () => {
   it('should be able to recover the password using the email', async () => {
      const fakeUserRepository = new FakeUsersRepository();
      const fakeMailProvider = new FakeMailProvider();

      const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

      const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
         fakeUserRepository,
         fakeMailProvider,
      );

      await fakeUserRepository.create({
         name: 'John Doe',
         email: 'john@doe.com',
         password: '123456',
      });

      await sendForgotPasswordEmail.execute({
         email: 'john@doe.com',
      });

      expect(sendMail).toHaveBeenCalled();
   });
});
