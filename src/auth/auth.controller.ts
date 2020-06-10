import {Controller, Request, Post, UseGuards, Body, Get, Param} from '@nestjs/common';
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local-auth.guard";
import { UserCreateDto } from "../users/interfaces/user.create.dto";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('sign-up')
  addUser(@Body() userDto: UserCreateDto): {} {
    return this.authService.createUser(userDto);
  }

  @Get('mail-confirmation/:confHash')
  confirmEmail(@Param('confHash') confHash: string) {
    return this.authService.confirmEmail(confHash);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
