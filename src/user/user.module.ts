import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {User} from "./entities/user.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CurrentUserService} from "../commonds/current-user/current-user.service";
import {CurrentUserModule} from "../commonds/current-user/current-user.module";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
