import {ApiProperty} from "@nestjs/swagger";
import {UserRoles} from "../../commonds/Constants";

export class CreateUserDto {
    constructor(name: string, email: string, password: string, phone: string, role: UserRoles) {
        this.Name = name;
        this.Email = email;
        this.Phone = phone;
        this.Role = role;
        this.Password = password;
    }
    @ApiProperty()
    Name: string;
    @ApiProperty()
    Email: string;
    @ApiProperty()
    Password: string;
    @ApiProperty()
    Phone: string;
    @ApiProperty()
    Role: UserRoles;
}
