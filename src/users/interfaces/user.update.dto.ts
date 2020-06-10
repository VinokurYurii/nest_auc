export class UserUpdateDto  {
  readonly firstName: string;
  readonly lastName: string;
  readonly phone: string;
  readonly birthDay?: Date;
  readonly password: string;
}
