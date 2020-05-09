import { inject, injectable } from 'tsyringe';

// import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

interface IRequest {
   email: string;
}

@injectable()
class SendForgotPasswordEmailService {
   constructor(
      @inject('UsersRepository')
      private usersRepository: IUserRepository,

      @inject('MailProvider')
      private mailProvider: IMailProvider,

      @inject('UserTokensRepository')
      private userTokensRepository: IUserTokensRepository,
   ) {}

   public async execute({ email }: IRequest): Promise<void> {
      const user = await this.usersRepository.findByEmail(email);

      if (!user) {
         throw new AppError('User does not exists.');
      }

      const { token } = await this.userTokensRepository.generate(user.id);

      await this.mailProvider.sendMail(
         email,
         `Pedido de recuperação de senha recebido ${token}`,
      );
   }
}

export default SendForgotPasswordEmailService;
