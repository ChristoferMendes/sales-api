import nodemailer from 'nodemailer';
import { HandleBarsMailTemplate } from './HandleBarsMailTemplate';

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariable;
}

interface IMailContact {
  name: string;
  email: string;
}

interface ISendEmail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}

export class EtherealMail {
  static async sendMail({ to, from, subject, templateData }: ISendEmail): Promise<{ url: string | false }> {
    const account = await nodemailer.createTestAccount();
    const { parse } = new HandleBarsMailTemplate();

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    const message = await transporter.sendMail({
      from: {
        name: from?.name || 'Team sales-api',
        address: from?.email || 'team@sales-api.com',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject: subject,
      html: await parse(templateData),
    });

    const url = nodemailer.getTestMessageUrl(message);

    return { url };
  }
}
