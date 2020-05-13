import { inject, injectable } from 'tsyringe';
import nodemailer, { Transporter } from 'nodemailer';

import mailConfig from '@config/mail';

import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';

@injectable()
export default class GmailMailProvider implements IMailProvider {
   private client: Transporter;

   constructor(
      @inject('MailTemplateProvider')
      private mailTemplateProvider: IMailTemplateProvider,
   ) {
      this.client = nodemailer.createTransport({
         host: 'smtp.gmail.com',
         auth: {
            type: 'login', // default
            user: process.env.MAIL_ACCOUNT,
            pass: process.env.MAIL_ACCOUNT_PASSWORD,
         },
      });
   }

   public async sendMail({
      to,
      subject,
      from,
      templateData,
   }: ISendMailDTO): Promise<void> {
      const { email, name } = mailConfig.defaults.from;

      await this.client.sendMail({
         from: {
            name: from?.name || name,
            address: from?.email || email,
         },
         to: {
            name: to.name,
            address: to.email,
         },
         subject,
         html: await this.mailTemplateProvider.parse(templateData),
      });
   }
}
