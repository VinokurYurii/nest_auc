import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false, unique: true})
  email: string;

  @Column({nullable: false})
  firstName: string;

  @Column({nullable: false})
  lastName: string;

  @Column({nullable: false, unique: true})
  phone: string;

  @Column({nullable: false})
  birthDay: Date;

  @Column({nullable: false, default: ''})
  password: string;

  @Column({nullable: false, default: ''})
  salt: string;

  fullName(): string {
    return this.firstName + ' ' + this.lastName
  }
}
