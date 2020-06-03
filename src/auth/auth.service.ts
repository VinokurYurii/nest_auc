import { Injectable } from '@nestjs/common';
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && user.password == password) {
      const { password, ...userData } = user;
      return userData;
    }

    return null;
  }
}
