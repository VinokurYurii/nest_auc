import {Body, Controller, Get, Post, Param, Patch, Delete, UseGuards, Request} from '@nestjs/common';
import { UsersService } from './users.service'
import { UserCreateDto } from "./interfaces/user.create.dto";
import { UserUpdateDto } from "./interfaces/user.update.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {
  }

  @Post()
  addUser(@Body() userDto: UserCreateDto): {} {
    return this.usersService.insertUser(userDto);
  }

  @Get()
  index() {
    return this.usersService.getUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  show(@Param('id') userId: string, @Request() req) {
    return this.usersService.getUser(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') userId: string,
         @Body() userDto: UserUpdateDto,
         @Request() req): {} {
    return this.usersService.updateUser(userId, userDto)
  }

  @Delete(':id')
  delete(@Param('id') userId: string) {
    this.usersService.delete(userId);
  }
}
