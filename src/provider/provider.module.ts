import { Module } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { ProviderController } from './provider.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Provider} from "./entities/provider.entity";
import {UserModule} from "../user/user.module";
import {UserService} from "../user/user.service";

@Module({
  imports: [TypeOrmModule.forFeature([Provider]), UserModule],
  controllers: [ProviderController],
  providers: [ProviderService],
  exports: [ProviderService]
})
export class ProviderModule {}
 