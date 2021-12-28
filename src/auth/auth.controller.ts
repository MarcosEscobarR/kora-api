import {Body, Controller, HttpStatus, Injectable, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {SingInDto} from "./models/SingIn.dto";
import {UserService} from "../user/user.service";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../user/entities/user.entity";
import {Repository} from "typeorm";
import {RefreshTokenDto} from "./models/RefreshToken.Dto";

@Controller('auth')
export class AuthController {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User> , private readonly authService: AuthService) {}
    
    @Post()
    async SingIn(@Body() signInDto: SingInDto) {
        const user = await this.userRepository.findOne({Email: signInDto.Email})
        if (!user) return HttpStatus.NOT_FOUND;
        
        if (await this.authService.validateUser(user.Email, user.Password)){
            return this.authService.generateAccessToken(user.Email);
        }
        
        return HttpStatus.FORBIDDEN;
    }
    
    @Post("refresh")
    async Refresh(@Body()refreshtoken: RefreshTokenDto) {
        const tokens = this.authService.validateRefreshToken(refreshtoken.refreshToken)
        if (tokens) {
            return tokens
        } 
        
        return HttpStatus.FORBIDDEN
    }
}
