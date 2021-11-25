import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Provider } from '../../provider/entities/provider.entity';
import { CategoryProduct } from './categoryProduct';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  Id: number;
  @Column('varchar')
  Name: string;
  @OneToOne(() => Provider)
  @JoinColumn()
  Provider: Provider;
  @OneToMany(() => CategoryProduct, (product) => product.Product)
  Products: CategoryProduct[];
}
