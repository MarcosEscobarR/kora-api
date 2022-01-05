import {CacheModule, Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {User} from "../user/entities/user.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {JwtModule} from "@nestjs/jwt";
import {UserModule} from "../user/user.module";
import {AuthController} from './auth.controller';
import {PassportModule} from "@nestjs/passport";
import {JwtStrategy} from "./jwt.strategy";
import {LocalStrategy} from "./local.strategy";
import {CurrentUserService} from "../commonds/current-user/current-user.service";



@Module({
    imports: [
        UserModule,
        CacheModule.register(),
        TypeOrmModule.forFeature([User]),
        PassportModule.register({defaultStrategy:'jwt'}),
        JwtModule.register({
            secret: process.env.ACCESS_SECRET,
            signOptions: {expiresIn: '5m'},
        })],
    providers: [AuthService,JwtStrategy, LocalStrategy, CurrentUserService],
    exports: [AuthService],
    controllers: [AuthController]
})
export class AuthModule {
}
