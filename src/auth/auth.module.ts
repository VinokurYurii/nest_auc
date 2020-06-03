import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from "../users/user.module";
import { PassportModule } from "@nestjs/passport";
import {JwtStrategy} from "./jwt.strategy";

@Module({
  imports: [UserModule, PassportModule],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
