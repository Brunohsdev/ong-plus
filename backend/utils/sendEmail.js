const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(usuario, url) {
    this.to = usuario.email;
    this.nome = usuario.nome;
    this.url = url;
    this.de = `ONG+ <${process.env.EMAIL_FROM}>`;
  }

  criarTransporte() {
    if (process.env.NODE_ENV === 'production') {
      // SendGrid
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD
        }
      });
    }

    // Mailtrap para desenvolvimento
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  async enviar(template, assunto) {
    // 1) Renderizar HTML baseado em template Pug
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      nome: this.nome,
      url: this.url,
      assunto
    });

    // 2) Definir opções do email
    const mailOptions = {
      from: this.de,
      to: this.to,
      subject: assunto,
      html,
      text: htmlToText.fromString(html)
    };

    // 3) Criar transporte e enviar email
    await this.criarTransporte().sendMail(mailOptions);
  }

  async enviarBoasVindas() {
    await this.enviar('boasVindas', 'Bem-vindo à plataforma ONG+!');
  }

  async enviarResetSenha() {
    await this.enviar('resetSenha', 'Seu token para resetar senha (válido por 10 minutos)');
  }
};
