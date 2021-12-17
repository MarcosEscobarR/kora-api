import { User } from '../../user/entities/user.entity';
import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Company {
  constructor(user: User, ruc: string) {
    this.Ruc = ruc;
    this.User = user;
  }
  @PrimaryGeneratedColumn()
  Id: number;
  @Column('varchar')
  Ruc: string;
  @OneToOne(() => User)
  @JoinColumn()
  User: User;
}
