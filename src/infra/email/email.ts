import * as Email from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export const emailPadrao = "keltonmof@gmail.com";

const remetente = Email.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: emailPadrao,
    pass: "",
    clientId:
      "",
    clientSecret: "",
    refreshToken:
      "1//04N9npcsmphtnCgYIARAAGAQSNwF-L9IrbXicCkGmzDVyg-LeyvR8N_H3QiHzdOx4kUamYnXm5xZB9CUM6pIRanxtONJwd7nRd0s",
    accessToken:
      "ya29.a0AbVbY6O1aSPOYdEr2xpmpU8LnU0aKbzLLg22KBwqL_gCn50bKQwhJZ--pc7fy1KjZPaU5KxxZTguXMpYHzfXVXi9vXa7jp9H4q4vS2CSmLv9GdX9vSgF3p1MMyDClUsskRhNH2iW-QmuBVIzbGTrpSQhNU0baCgYKATkSARISFQFWKvPlzgrylyTBR_NMJxKK7Ydmyw0163",
  },
} as SMTPTransport.Options);

export const EnviarEmail = (emailASerEnviado: any) => {
  try {
    remetente.sendMail(emailASerEnviado);
  } catch (err) {
    const message = err.message ? err.message : err
    console.log('Erro ao enviar e-mail. ' + message)
  }
};
