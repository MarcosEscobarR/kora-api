import {ApiProperty} from "@nestjs/swagger";
import {CreateUserDto} from "../../user/dto/create-user.dto";

export class CreateProviderDto extends CreateUserDto{
    @ApiProperty()
    Dni: string;
    userId: number;
    rating: number = 0;

}
