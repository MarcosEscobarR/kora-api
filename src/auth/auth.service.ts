import { Injectable } from '@nestjs/common';
import {UserService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt";
import {JwtPayload} from "./models/JwtPayload";

@Injectable()
export class AuthService {
    constructor(private UserService: UserService, private JwtService: JwtService) {}
    
    async validateUser(email: string, pass: string){
        const user = await this.UserService.findByEmail(email);
        return  await user.validatePassword(pass)
    }
    
    async generateAccessToken(email: string) {
        const user = await this.UserService.findByEmail(email);
        const payload: JwtPayload = {
            role: user.Role.toString()
        }
        
        return {
            access_token: this.JwtService.sign(payload, {secret: process.env.ACCESS_SECRET, subject: user.Id.toString(), expiresIn: '5m'}),
            refresh_token: this.JwtService.sign({secret: process.env.REFRESH_SECRET, subject: user.Id.toString(), expiresIn: '5m'})
        }
    }
}
