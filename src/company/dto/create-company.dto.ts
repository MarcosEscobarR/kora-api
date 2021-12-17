import {ApiProperty} from "@nestjs/swagger";

export class CreateCompanyDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    phone: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    Ruc: string;
    @ApiProperty()
    password: string;
    userId: number;
}
