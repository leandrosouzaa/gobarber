import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;

let fakeMailProvider: FakeMailProvider;

let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
   beforeEach(() => {
      fakeUsersRepository = new FakeUsersRepository();
      fakeMailProvider = new FakeMailProvider();
      fakeUserTokensRepository = new FakeUserTokensRepository();

      sendForgotPasswordEmail = new SendForgotPasswordEmailService(
         fakeUsersRepository,
         fakeMailProvider,
         fakeUserTokensRepository,
      );
   });

   it('should be able to recover the password using the email', async () => {
      const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

      await fakeUsersRepository.create({
         name: 'John Doe',
         email: 'john@doe.com',
         password: '123456',
      });

      await sendForgotPasswordEmail.execute({
         email: 'john@doe.com',
      });

      expect(sendMail).toHaveBeenCalled();
   });

   it('should not be able to recover a non-existing user password', async () => {
      await expect(
         sendForgotPasswordEmail.execute({
            email: 'john@doe.com',
         }),
      ).rejects.toBeInstanceOf(AppError);
   });

   it('should generate a forgot password token', async () => {
      const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

      const user = await fakeUsersRepository.create({
         name: 'John Doe',
         email: 'john@doe.com',
         password: '123456',
      });

      await sendForgotPasswordEmail.execute({
         email: 'john@doe.com',
      });

      expect(generateToken).toHaveBeenCalledWith(user.id);
   });
});
