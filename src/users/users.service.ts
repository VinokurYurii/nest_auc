import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserCreateDto } from "./interfaces/user.create.dto";
import { UserUpdateDto } from "./interfaces/user.update.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  users: User[] = [];

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async insertUser(userDto: UserCreateDto): Promise<User> {
    const existedPhoneOrEmailUser = await this.findByPhoneOrEmail(userDto.phone, userDto.email);

    if (existedPhoneOrEmailUser) {
      throw new ConflictException("User with some email or phone already exists.");
    }

    const {password, ...userData} = userDto;

    let user: User = new User();
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    user.birthDay = new Date();
    user = Object.assign(user, userData);

    return this.userRepository.save(user);
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUser(userId: string): Promise<User> {
    return this.findUser(userId);
  }

  async updateUser(userId: string, userDto: UserUpdateDto): Promise<User> {
    const user: User = await this.findUser(userId);


    const existedPhoneUser = await this.findByPhoneOrEmail(userDto.phone);

    if (existedPhoneUser && existedPhoneUser.id != Number(userId)) {
      throw new ConflictException("User with some phone already exists.");
    }

    Object.assign(user, userDto);

    if(userDto.password) {
      user.salt = await bcrypt.genSalt();
      user.password = await this.hashPassword(userDto.password, user.salt);
    }

    return this.userRepository.save(user);
  }

  async delete(userId: string): Promise<void> {
    const user: User = await this.findUser(userId);

    this.userRepository.remove(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({email: email});
  }

  private async findUser(userId: string): Promise<User> {
    const user: User = await this.userRepository.findOne(userId);

    if(!user) {
      throw new NotFoundException();
    }

    return user;
  }

  private async findByPhoneOrEmail(phone: string, email?: string): Promise<User> {
    if(email) {
      const user = await this.findByEmail(email);

      if(user) {
        return user;
      }
    }

    return this.userRepository.findOne({phone: phone});
  }

  private async hashPassword(rawPassword, salt): Promise<string> {
    return bcrypt.hash(rawPassword, salt);
  }
}
