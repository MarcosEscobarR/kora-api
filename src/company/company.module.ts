import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import {Company} from "./entities/company.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserModule} from "../user/user.module";
import {FavoriteProviderController} from "./favorite-provider.controller";
import {FavoriteProviderService} from "./favorite-provider.service";
import {FavoriteProviders} from "./entities/favoriteProviders.entity";
import {CurrentUserModule} from "../commonds/current-user/current-user.module";

@Module({
  imports: [TypeOrmModule.forFeature([Company, FavoriteProviders]), UserModule, CurrentUserModule, CompanyModule],
  controllers: [CompanyController, FavoriteProviderController],
  providers: [CompanyService, FavoriteProviderService],
})
export class CompanyModule {}
