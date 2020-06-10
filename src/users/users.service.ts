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

  async saveUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUser(userId: number): Promise<User> {
    return this.findUser(userId);
  }

  async updateUser(userId: number, userDto: UserUpdateDto): Promise<User> {
    const user: User = await this.findUser(userId);


    const existedPhoneUser = await this.findByPhoneOrEmail(userDto.phone);

    if (existedPhoneUser && existedPhoneUser.id != Number(userId)) {
      throw new ConflictException("User with some phone already exists.");
    }

    Object.assign(user, userDto);

    return this.userRepository.save(user);
  }

  async delete(userId: number): Promise<void> {
    const user: User = await this.findUser(userId);

    this.userRepository.remove(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({email: email});
  }

  private async findUser(userId: number): Promise<User> {
    const user: User = await this.userRepository.findOne(userId);

    if(!user) {
      throw new NotFoundException();
    }

    return user;
  }

  public async findByPhoneOrEmail(phone: string, email?: string): Promise<User> {
    if(email) {
      const user = await this.findByEmail(email);

      if(user) {
        return user;
      }
    }

    return this.userRepository.findOne({phone: phone});
  }

  public async findByEmailHash(emailHash: string): Promise<User> {
    return this.userRepository.findOne({mailConfirmationHashString: emailHash});
  }
}
