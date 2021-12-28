import { Injectable } from '@nestjs/common';
import {UserService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt";
import {JwtPayload} from "./models/JwtPayload";
import {User} from "../user/entities/user.entity";
import {log} from "util";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private UserService: UserService, private JwtService: JwtService) {}
    
    async validateUser(email: string, pass: string): Promise<boolean>{
       try {
           const user = await this.UserService.findByEmail(email);
           await user.validatePassword(pass)
           return true;
       } catch (e) {
           console.log(e)
           return false;
       }
    }
    
     async generateAccessToken(email: string) {
        const user = await this.UserService.findByEmail(email);
        return this.generateTokens(user);
    }
    
    async validateRefreshToken(token: string) {
         try {
             const tokenDecoded = this.JwtService.decode(token);
             
             await this.JwtService.verify(token, {secret: process.env.REFRESH_SECRET, subject: tokenDecoded.sub})
             const user = await this.UserService.findOne(19);
             return this.generateTokens(user);
         } catch (e) {
             console.log(e)
             return null;
         }
    }
    
    private generateTokens(user: User) {
        const payload: JwtPayload = {
            role: user.Role.toString()
        }
        
        return {
            access_token: this.JwtService.sign(payload, {privateKey: process.env.ACCESS_SECRET, subject: user.Id.toString(), expiresIn: '5m',}),
            refresh_token: this.JwtService.sign({subject: user.Id.toString(),},{secret: process.env.REFRESH_SECRET, expiresIn: '5m'})
        }
    }
    
}
