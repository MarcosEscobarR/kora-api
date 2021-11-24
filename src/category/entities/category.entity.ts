import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Provider } from '../../provider/entities/provider.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  Id: number;
  @Column('varchar')
  Name: string;
  @OneToOne(() => Provider)
  @JoinColumn()
  Provider: Provider;
}
