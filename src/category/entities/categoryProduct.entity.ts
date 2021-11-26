import { Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './category.entity';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class CategoryProductEntity {
  @PrimaryGeneratedColumn()
  Id: number;
  @OneToOne(() => Category)
  Category: Category;
  @ManyToOne(() => Category, (category) => category.Products)
  Product: Product;
}
