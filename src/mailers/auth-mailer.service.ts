import { Injectable } from "@nestjs/common";
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthMailerService {
  constructor(private readonly mailerService: MailerService) {}

  public sendInvitationMail(email: string, link: string): void {
    this.mailerService.sendMail({
      to: email,
      from: 'nest-js@auction.bro',
      subject: 'Confirm your email',
      text: `You need to confirm your email by this link: ${link}`,
      html: `<b>Bold html</b> <a href="${link}">Confirm email link</a>.`
    })
      .then(() => {})
      .catch(() => {})
  }
}
