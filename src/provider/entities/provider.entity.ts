import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Provider {
  @PrimaryGeneratedColumn()
  Id: number;
  @Column('varchar')
  Dni: string;
  @Column('decimal')
  Rating: number;
  @OneToOne(() => User)
  @JoinColumn()
  User: User;
}
