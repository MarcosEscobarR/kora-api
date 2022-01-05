import {CACHE_MANAGER, Inject, Injectable, Scope} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {Cache} from 'cache-manager';
import {REQUEST} from "@nestjs/core";
import {Request} from 'express';
import {MeModel} from "../../auth/models/meModel";
import {UserService} from "../../user/user.service";
import {User} from "../../user/entities/user.entity";


@Injectable({scope: Scope.REQUEST})
export class CurrentUserService {
    constructor(private readonly userService: UserService,
                private JwtService: JwtService,
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
}