import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    @ApiProperty()
    name: string

    @ApiProperty()
    english: string
}
export class SetCategoryDto {
    @IsString()
    @ApiProperty()
    id: string
    
    @IsString()
    @ApiProperty()
    name: string

    @ApiProperty()
    english: string
}