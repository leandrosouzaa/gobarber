interface IMailConfig {
   driver: 'ethereal' | 'gmail';
   defaults: {
      from: {
         email: string;
         name: string;
      };
   };
}

export default {
   driver: process.env.MAIL_DRIVER || 'ethereal',

   defaults: {
      from: {
         email: `${process.env.MAIL_ACCOUNT}`,
         name: 'Leandro do GoBarber',
      },
   },
} as IMailConfig;
