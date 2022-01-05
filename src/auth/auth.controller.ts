import {Body, Controller, Get, Headers, HttpStatus, Post, UnauthorizedException, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {SingInDto} from "./models/SingIn.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../user/entities/user.entity";
import {Repository} from "typeorm";
import {RefreshTokenDto} from "./models/RefreshToken.Dto";
import {LocalStrategy} from "./local.strategy";
import {JwtGard} from "./jwt.gard";
import {CurrentUserService} from "../commonds/current-user/current-user.service";
import {MeModel} from "./models/meModel";


@Controller('auth')
export class AuthController {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
                private readonly authService: AuthService,
                private readonly localStrategy: LocalStrategy,
                private readonly currentUserService: CurrentUserService
    ) {
    }

    @Post()
    async SingIn(@Body() signInDto: SingInDto) {
        const user = await this.userRepository.findOne({Email: signInDto.username})
        if (!user) return HttpStatus.NOT_FOUND;

        if (await this.localStrategy.validateUser(user.Email, user.Password)) {
            return this.authService.generateAccessToken(user.Email);
        }

        return HttpStatus.FORBIDDEN;
    }

    @Post("refresh")
    async Refresh(@Body() refreshTokenDto: RefreshTokenDto) {
        const tokens = await this.authService.validateRefreshToken(refreshTokenDto.refreshToken)
        if (tokens) {
            return tokens
        }

        return new UnauthorizedException()
    }

    @UseGuards(JwtGard)
    @Get('me')
    async GetMe() {
        const currentUser = await this.currentUserService.getCurrentUser()
        if (currentUser)
            return {
                id: currentUser.Id,
                email: currentUser.Email,
                name: currentUser.Name,
                role: currentUser.Role.toString(),
                phone: currentUser.Phone
            } as MeModel;

        return HttpStatus.INTERNAL_SERVER_ERROR
    }
}
