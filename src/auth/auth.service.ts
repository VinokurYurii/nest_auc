import { ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from "../users/users.service";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserCreateDto } from "../users/interfaces/user.create.dto";
import { User } from "../users/user.entity";
import { AuthMailerService } from "../mailers/auth-mailer.service";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private authMailerService: AuthMailerService
  ) {}

  async confirmEmail(encodedHash: string): Promise<any> {
    const confirmationHash: string = Buffer.from(encodedHash, 'base64').toString();
    const user: User = await this.userService.findByEmailHash(confirmationHash);

    if(user && !user.mailConfirmed) {
      user.mailConfirmationHashString = '';
      user.mailConfirmed = true;

      return this.userService.saveUser(user);
    }

    return {message: 'This user does not exist or email already confirmed.'};
  }

  async createUser(userDto: UserCreateDto): Promise<{}> {
    const existedPhoneOrEmailUser = await this.userService.findByPhoneOrEmail(userDto.phone, userDto.email);

    if (existedPhoneOrEmailUser) {
      throw new ConflictException("User with some email or phone already exists.");
    }

    const {password, ...userData} = userDto;

    let user: User = new User();
    const salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, salt);
    user.birthDay = new Date();
    user.mailConfirmationHashString = await this.hashPassword(userDto.email, salt);
    user = Object.assign(user, userData);

    const mailConfirmationLink = 'http://localhost:3000/auth/mail-confirmation/' + Buffer.from(user.mailConfirmationHashString).toString('base64');
    await this.authMailerService.sendInvitationMail(userDto.email, mailConfirmationLink);

    await this.userService.saveUser(user);

    return {
      message: 'We send confirmation email to mentioned by you email. You can work with you account after email confirmation.'
    };
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const match = await bcrypt.compare(pass, user.password);

      if(match) {
        const { password, ...userData } = user;
        return userData;
      }
    }

    return null;
  }

  async login(user: any) {
    const payload = {username: user.firstName, sub: user.id};

    return {
      access_token: this.jwtService.sign(payload)
    }
  }

  private async hashPassword(rawPassword, salt): Promise<string> {
    return bcrypt.hash(rawPassword, salt);
  }
}
