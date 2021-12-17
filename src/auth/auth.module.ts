import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {User} from "../user/entities/user.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserService} from "../user/user.service";
import {JwtModule} from "@nestjs/jwt";
import {UserModule} from "../user/user.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), UserModule, JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '60s' },
  })],
  providers: [AuthService, UserService],
  exports: [AuthService]
})
export class AuthModule {
}
