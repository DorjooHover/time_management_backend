import { ApiProperty } from '@nestjs/swagger'
import {IsString} from 'class-validator'
export class ProfessionCreateDto {
    @IsString()
    @ApiProperty()
    name: string
}
export class ProfessionSetDto {
    @IsString()
    @ApiProperty()
    id: string
    
    @IsString()
    @ApiProperty()
    name: string
}