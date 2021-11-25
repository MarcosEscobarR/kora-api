import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Provider } from '../../provider/entities/provider.entity';
import { Product } from '../../product/entities/product.entity';
import { Promotion } from './promotion.entity';

@Entity()
export class PromotionProduct {
  @PrimaryGeneratedColumn()
  Id: number;
  @ManyToOne(() => Provider)
  Provider: Provider;
  @ManyToOne(() => Product)
  Product: Product;
  @ManyToOne(() => Promotion)
  Promotion: Promotion;
  @Column('decimal')
  Price: number;
}
