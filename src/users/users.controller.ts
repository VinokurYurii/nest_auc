import { Body, Controller, Get, Param, Patch, Delete, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service'
import { UserUpdateDto } from "./interfaces/user.update.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {
  }

  @Get()
  index() {
    return this.usersService.getUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  show(@Param('id', ParseIntPipe) userId: number, @Request() req) {
    return this.usersService.getUser(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) userId: number,
         @Body() userDto: UserUpdateDto,
         @Request() req): {} {
    return this.usersService.updateUser(userId, userDto)
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) userId: number) {
    this.usersService.delete(userId);
  }
}
