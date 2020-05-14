import { container } from 'tsyringe';

import mailConfig from '@config/mail';

import IMailProvider from './models/IMailProvider';

import EtherialMailProvider from './implementations/EtherialMailProvider';
import GmailMailProvider from './implementations/GmailMailProvider';

const providers = {
   ethereal: container.resolve(EtherialMailProvider),
   gmail: container.resolve(GmailMailProvider),
};

container.registerInstance<IMailProvider>(
   'MailProvider',
   providers[mailConfig.driver],
);
