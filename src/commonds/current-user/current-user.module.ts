import {CacheModule, Module} from '@nestjs/common';
import {UserModule} from "../../user/user.module";
import {CurrentUserService} from "./current-user.service";
import {JwtModule} from "@nestjs/jwt";

@Module({
    imports: [UserModule,
        JwtModule.register({
        secret: process.env.ACCESS_SECRET,
        signOptions: {expiresIn: '5m'},
    }),
        CacheModule.register()
    ],
    providers: [CurrentUserService],
    exports: [CurrentUserService]
})
export class CurrentUserModule {}
