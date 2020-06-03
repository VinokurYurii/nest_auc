import { User } from './user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { UserDto } from './interfaces/user.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // createUser = async (userDto: UserDto) => {
  //   return await this.save(userDto);
  // };
  // async createUser(userDto: UserDto) {
  //   return await this.save(userDto);
  // };
  createUser = function(userDto: UserDto) {
    return this.save(userDto);
  };

  findAll = async () => {
    return await this.findAll();
  };
}

