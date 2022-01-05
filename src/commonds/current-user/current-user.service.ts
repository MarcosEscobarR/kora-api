import {CACHE_MANAGER, Inject, Injectable, Scope} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {Cache} from 'cache-manager';
import {REQUEST} from "@nestjs/core";
import {Request} from 'express';
import {UserService} from "../../user/user.service";
import {User} from "../../user/entities/user.entity";
import {ProviderService} from "../../provider/provider.service";


@Injectable({scope: Scope.REQUEST})
export class CurrentUserService {
    constructor(private readonly userService: UserService,
                private JwtService: JwtService,
                private providerService: ProviderService,
                @Inject(CACHE_MANAGER) private cacheManager: Cache,
                @Inject(REQUEST) private readonly request: Request) {
    }

    async getCurrentUser(): Promise<User> {
        //Bearer *token*
        //       ^
        //      take since here
        const tokenDecoded = this.JwtService.decode(this.request.headers.authorization.substring(7));

        let user: string | User = await this.cacheManager.get(tokenDecoded.sub);
        if (user) return JSON.parse(user as string)

        const userEntity = await this.userService.findOne(tokenDecoded.sub)
        await this.cacheManager.set(tokenDecoded.sub, JSON.stringify(user), {ttl: 1000})

        return userEntity;
    }
    
    async getCurrentProvider() {
        const user = await this.getCurrentUser();
        return await this.providerService.findByUser(user);
    }
}