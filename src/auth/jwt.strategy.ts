import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {Injectable, NotFoundException, UnauthorizedException} from "@nestjs/common";
import { AuthService } from "./auth.service";
import {User} from "../users/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(email, password)
      .catch((err: NotFoundException) => {
        throw new UnauthorizedException(err.message);
    });

    return user;
  }
}
