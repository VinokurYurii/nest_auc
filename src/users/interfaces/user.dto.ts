export class UserDto {
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly phone: string;
  readonly birthDay?: Date;
  readonly password: string;
}
