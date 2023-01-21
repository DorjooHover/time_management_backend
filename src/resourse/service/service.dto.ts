import { ApiProperty } from '@nestjs/swagger'
import {IsString, IsArray} from 'class-validator'
export class CreateServiceDto {
    @IsString()
    @ApiProperty()
    name: string
    
    @IsString()
    @ApiProperty()
    english: string
    
    @IsString()
    @ApiProperty()
    description: string
    
    @IsString()
    @ApiProperty()
    price: string
    
    @IsString()
    @ApiProperty()
    currency: string
    
    @IsString()
    @ApiProperty()
    duration: string
    
    @IsString()
    @ApiProperty()
    pre: string

    @IsString()
    @ApiProperty()
    href: string
    
    @IsArray()
    @ApiProperty({isArray: true})
    employees: []

    @IsString()
    @ApiProperty({required: true})
    categoryId: string
}
export class SetServiceDto {

    @ApiProperty()
    id: string
    
    @ApiProperty()
    name: string
    
    @ApiProperty()
    english: string
    
    @ApiProperty()
    description: string
    
    @ApiProperty()
    price: string
    
    @ApiProperty()
    currency: string
    
    @ApiProperty()
    duration: string

    @ApiProperty()
    pre: string

    @ApiProperty()
    href: string

    @ApiProperty({isArray: true})
    employees: []
    
    @ApiProperty()
    categoryId: string
}