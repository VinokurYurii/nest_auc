import { Body, Controller, Get, Post, Param, Patch, Delete } from '@nestjs/common';
import {UsersService} from './users.service'
import {UserDto} from "./interfaces/user.dto";

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {
  }

  @Post()
  addUser(@Body() userDto: UserDto): {} {
    return this.usersService.insertUser(userDto);
  }

  @Get()
  index() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  show(@Param('id') userId: string) {
    return this.usersService.getUser(userId);
  }

  @Patch(':id')
  update(@Param('id') userId: string,
         @Body() userDto: UserDto): {} {
    return this.usersService.updateUser(userId, userDto)
  }

  @Delete(':id')
  delete(@Param('id') userId: string) {
    this.usersService.delete(userId);
  }
}
