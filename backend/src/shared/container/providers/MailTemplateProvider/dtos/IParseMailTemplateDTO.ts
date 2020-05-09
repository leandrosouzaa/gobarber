interface ITemplateVariables {
   [key: string]: string | number;
}

export default interface IParseEmailTemplateDTO {
   template: string;
   variables: ITemplateVariables;
}
