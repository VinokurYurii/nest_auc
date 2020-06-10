import { Injectable } from '@nestjs/common';
import { UsersService } from "../users/users.service";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const match = await bcrypt.compare(pass, user.password);

      if(match) {
        const { password, salt, ...userData } = user;
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
}
