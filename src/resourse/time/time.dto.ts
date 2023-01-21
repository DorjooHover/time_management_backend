import { ApiProperty } from '@nestjs/swagger'
import {IsString, IsArray} from 'class-validator'
export class CreateTimeDto {
    @IsString()
    @ApiProperty()
    name: string
    
}
