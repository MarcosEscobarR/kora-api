import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class OrderProductEntity {
  @PrimaryGeneratedColumn()
  Id: number;
  @ManyToOne(() => Order, (o) => o.OrderProducts)
  Order: Order;
  @ManyToOne(() => Product)
  Product: Product;
  @Column('integer')
  Quantity: number;
}
