import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {User} from "../user/entities/user.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserService} from "../user/user.service";
import {JwtModule} from "@nestjs/jwt";
import {UserModule} from "../user/user.module";
import { AuthController } from './auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), UserModule, JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '60s' },
  })],
  providers: [AuthService, UserService],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {
}
