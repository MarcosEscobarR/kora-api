import {ApiProperty} from "@nestjs/swagger";

export class CreateProductDto {
    @ApiProperty()
    products: ProductDto[]
    
    @ApiProperty()
    providerId: number
}

class ProductDto {
    @ApiProperty()
    name: string

    @ApiProperty()
    measurementUnit: string;

    @ApiProperty()
    quantity: number
}
