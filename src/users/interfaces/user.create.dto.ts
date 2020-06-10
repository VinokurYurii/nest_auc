import {UserUpdateDto} from "./user.update.dto";

export class UserCreateDto extends UserUpdateDto {
  readonly email: string;
}
