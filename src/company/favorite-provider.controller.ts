import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Res, UseGuards} from "@nestjs/common";
import {ApiTags} from "@nestjs/swagger";
import {FavoriteProviderService} from "./favorite-provider.service";
import {JwtGard} from "../auth/jwt.gard";
import {CreateFavoriteProviderDto} from "./dto/create-favorite-provider.dto";

@ApiTags('favorite-provider')
@Controller('api/favorite-provider')
export class FavoriteProviderController {
    constructor(private readonly service: FavoriteProviderService) {}
    
    @Post()
    @UseGuards(JwtGard)
    @HttpCode(201)
    async create(@Body() dto: CreateFavoriteProviderDto) {
        const result = await this.service.create(dto);
        return result.toCreatedHttpResponse()
    }
    
    @Get()
    @UseGuards(JwtGard)
    async Get(@Param('skip') skip: number = 0, @Param('take') take: number = 10) {
        return await this.service.findAll(skip, take);
    }
    
    @Delete(':id')
    @UseGuards(JwtGard)
    async delete(@Param('id') id: number) {
        const result = await this.service.delete(id)
        
        return result.toHttpResponse()
    }
}