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
import { OrderProductEntity } from './orderProduct.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  Id: number;
  @ManyToOne(() => Company)
  Company: Company;
  @ManyToOne(() => Product)
  Product: Product;
  @Column('simple-enum')
  Status: OrderStatus;
  @OneToMany(() => OrderProductEntity, (p) => p.Order)
  OrderProducts: OrderProductEntity[];
}
