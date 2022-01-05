import {ApiProperty} from "@nestjs/swagger";
import {CreateUserDto} from "../../user/dto/create-user.dto";
import {User} from "../../user/entities/user.entity";

export class CreateProviderDto extends CreateUserDto{
    @ApiProperty()
    Dni: string;
    user: User;
    rating: number = 0;

}
