import IParseEmailTemplateDTO from '../dtos/IParseMailTemplateDTO';

export default interface IMailTemplateProvider {
   parse(data: IParseEmailTemplateDTO): Promise<string>;
}
