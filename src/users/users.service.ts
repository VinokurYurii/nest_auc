import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from "./interfaces/user.dto";

@Injectable()
export class UsersService {
  users: User[] = [];

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async insertUser(userDto: UserDto): Promise<User> {
    let user: User = new User();
    user.birthDay = new Date();
    user = Object.assign(user, userDto);
    // user.email = userDto.email;
    // user.firstName = userDto.firstName;
    // user.lastName = userDto.lastName;
    // user.phone = userDto.phone;
    // user.password = userDto.password;
    // user.birthDay = !!userDto.birthDay ? userDto.birthDay : new Date();

    return this.userRepository.save(user);
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUser(userId: string): Promise<User> {
    return this.findUser(userId);
  }

  async updateUser(userId: string, userDto: UserDto): Promise<User> {
    const user: User = await this.findUser(userId);

    Object.assign(user, userDto);

    return this.userRepository.save(user);
  }

  async delete(userId: string): Promise<void> {
    const user: User = await this.findUser(userId);

    this.userRepository.remove(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user: User = await this.userRepository.findOne({email: email});

    if(!user) {
      throw new NotFoundException();
    }

    return user;
  }

  private async findUser(userId: string): Promise<User> {
    const user: User = await this.userRepository.findOne(userId);

    if(!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
