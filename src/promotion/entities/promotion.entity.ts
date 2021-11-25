import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Provider } from '../../provider/entities/provider.entity';
import { PromotionProduct } from './promotionProduct.entity';

@Entity()
export class Promotion {
  @PrimaryGeneratedColumn()
  Id: number;
  @ManyToOne(() => Provider)
  Provider: Provider;
  @Column('datetime')
  Date: Date;
  @Column('bit')
  Available: boolean;
  @OneToMany(() => PromotionProduct, (p) => p.Promotion)
  PromotionProducts: PromotionProduct[];
}
