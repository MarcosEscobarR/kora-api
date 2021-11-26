import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { ProviderModule } from './provider/provider.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { CommentModule } from './comment/comment.module';
import { PromotionModule } from './promotion/promotion.module';
import { User } from './user/entities/user.entity';
import { Provider } from './provider/entities/provider.entity';
import { Promotion } from './promotion/entities/promotion.entity';
import { PromotionProduct } from './promotion/entities/promotionProduct.entity';
import { Product } from './product/entities/product.entity';
import { Order } from './order/entities/order.entity';
import { OrderProductEntity } from './order/entities/orderProduct.entity';
import { Company } from './company/entities/company.entity';
import { FavoriteProviders } from './company/entities/favoriteProviders.entity';
import { Comment } from './comment/entities/comment.entity';
import { Category } from './category/entities/category.entity';
import { CategoryProductEntity } from './category/entities/categoryProduct.entity';
import ormconfig from './ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...ormconfig,
      keepConnectionAlive: true,
      autoLoadEntities: true,
    }),
    UserModule,
    CompanyModule,
    ProviderModule,
    ProductModule,
    CategoryModule,
    OrderModule,
    CommentModule,
    PromotionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
