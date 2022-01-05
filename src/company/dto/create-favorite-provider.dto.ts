import {ApiProperty} from "@nestjs/swagger";

export class CreateFavoriteProviderDto {
    @ApiProperty()
    companyId: number
}