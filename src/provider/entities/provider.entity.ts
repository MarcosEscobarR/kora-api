import {
  Column,
  Entity, IsNull,
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
  @Column('decimal', {nullable: true})
  Rating: number = 0;
  @OneToOne(() => User)
  @JoinColumn()
  User: User;
}
