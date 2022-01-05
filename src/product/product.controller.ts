import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import passport from "passport";
import {JwtGard} from "../auth/jwt.gard";
import {PARAMTYPES_METADATA} from "@nestjs/common/constants";

@ApiTags('product')
@Controller('api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiBearerAuth()
  @UseGuards(JwtGard)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGard)
  @Get()
  findAll(@Param('skip') skip: number = 0, @Param('take') take: number = 10) {
    return this.productService.findAll(skip, take);
  }
  
  @ApiBearerAuth()
  @UseGuards(JwtGard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
