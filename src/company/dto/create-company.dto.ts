import {ApiProperty} from "@nestjs/swagger";
import {User} from "../../user/entities/user.entity";

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
    user: User;
}
