import {ApiProperty} from "@nestjs/swagger";

export class SingInDto {
    @ApiProperty()
    Email: string;
    @ApiProperty()
    Password: string;
}