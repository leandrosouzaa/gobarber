import { container } from 'tsyringe';

import mailConfig from '@config/mail';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

import IMailProvider from './MailProvider/models/IMailProvider';
import EtherialMailProvider from './MailProvider/implementations/EtherialMailProvider';
import GmailMailProvider from './MailProvider/implementations/GmailMailProvider';

import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from './MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

container.registerSingleton<IStorageProvider>(
   'StorageProvider',
   DiskStorageProvider,
);

container.registerSingleton<IMailTemplateProvider>(
   'MailTemplateProvider',
   HandlebarsMailTemplateProvider,
);

container.registerInstance<IMailProvider>(
   'MailProvider',
   mailConfig.driver === 'ethereal'
      ? container.resolve(EtherialMailProvider)
      : container.resolve(GmailMailProvider),
);
