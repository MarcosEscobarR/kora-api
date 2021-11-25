import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from '../../company/entities/company.entity';
import { Product } from '../../product/entities/product.entity';
import { OrderStatus } from '../../commonds/Constants';
import { OrderProduct } from './orderProduct';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  Id: number;
  @ManyToOne(() => Company)
  Company: Company;
  @ManyToOne(() => Product)
  Product: Product;
  @Column('enum')
  Status: OrderStatus;
  @OneToMany(() => OrderProduct, (p) => p.Order)
  OrderProducts: OrderProduct[];
}
