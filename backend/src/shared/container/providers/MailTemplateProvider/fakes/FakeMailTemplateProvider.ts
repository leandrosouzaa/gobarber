import IParseImailTemplateDTO from '../dtos/IParseMailTemplateDTO';

import IMailTemplateProvider from '../models/IMailTemplateProvider';

export default class FakeMailTemplateProvider implements IMailTemplateProvider {
   public async parse({ template }: IParseImailTemplateDTO): Promise<string> {
      return template;
   }
}
