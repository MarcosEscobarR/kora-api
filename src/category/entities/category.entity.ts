import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Provider } from '../../provider/entities/provider.entity';
import { CategoryProductEntity } from './categoryProduct.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  Id: number;
  @Column('varchar')
  Name: string;
  @OneToOne(() => Provider)
  @JoinColumn()
  Provider: Provider;
  @OneToMany(() => CategoryProductEntity, (product) => product.Product)
  Products: CategoryProductEntity[];
}
