import { User } from '../../user/entities/user.entity';
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  Id: number;
  @OneToOne(() => User)
  @JoinColumn()
  User: User;
}
