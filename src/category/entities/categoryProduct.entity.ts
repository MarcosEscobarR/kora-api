import { Entity } from "typeorm";
import { Category } from "./category.entity";
import { Product } from "../../product/entities/product.entity";

@Entity()
export class CategoryProductEntity {
  Id: number;
  Category: Category;
  Product: Product;
}
