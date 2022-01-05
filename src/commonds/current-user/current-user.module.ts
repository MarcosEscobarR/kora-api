import {CacheModule, Module} from '@nestjs/common';
import {UserModule} from "../../user/user.module";
import {CurrentUserService} from "./current-user.service";
import {JwtModule} from "@nestjs/jwt";
import {ProviderModule} from "../../provider/provider.module";

@Module({
    imports: [UserModule,
        JwtModule.register({
        secret: process.env.ACCESS_SECRET,
        signOptions: {expiresIn: '5m'},
    }),
        CacheModule.register(),
        ProviderModule
    ],
    providers: [CurrentUserService],
    exports: [CurrentUserService]
})
export class CurrentUserModule {}
