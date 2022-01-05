import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Product} from "./entities/product.entity";
import {CurrentUserService} from "../commonds/current-user/current-user.service";
import {CurrentUserModule} from "../commonds/current-user/current-user.module";
import {ProviderModule} from "../provider/provider.module";
import {ProviderService} from "../provider/provider.service";


@Module({
  imports:[TypeOrmModule.forFeature([Product]), ProviderModule, CurrentUserModule],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
