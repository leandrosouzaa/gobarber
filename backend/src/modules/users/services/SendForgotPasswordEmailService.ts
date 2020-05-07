import { inject, injectable } from 'tsyringe';

// import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

// import AppError from '@shared/errors/AppError';

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
   ) {}

   public async execute({ email }: IRequest): Promise<void> {
      this.mailProvider.sendMail(
         email,
         'Pedido de recuperação de senha recebido',
      );
   }
}

export default SendForgotPasswordEmailService;
