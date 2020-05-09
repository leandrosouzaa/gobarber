import handlebars from 'handlebars';

import IParseImailTemplateDTO from '../dtos/IParseMailTemplateDTO';

import IMailTemplateProvider from '../models/IMailTemplateProvider';

export default class HandlebarsMailTemplateProvider
   implements IMailTemplateProvider {
   public async parse({
      template,
      variables,
   }: IParseImailTemplateDTO): Promise<string> {
      const parseTemplate = handlebars.compile(template);

      return parseTemplate(variables);
   }
}
