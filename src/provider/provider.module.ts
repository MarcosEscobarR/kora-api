import { Module } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { ProviderController } from './provider.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Provider} from "./entities/provider.entity";
import {UserModule} from "../user/user.module";

@Module({
  imports: [TypeOrmModule.forFeature([Provider]), UserModule],
  controllers: [ProviderController],
  providers: [ProviderService]
})
export class ProviderModule {}
