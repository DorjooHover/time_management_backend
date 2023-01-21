import { ApiProperty } from "@nestjs/swagger"
import {IsString, IsArray} from 'class-validator'
import { Profession } from "schema"
import { Role } from "util/enum"
export class ScheduleDto {
    @IsString()
    @ApiProperty()
    day: string
    
    @IsArray()
    @ApiProperty({isArray: true})
    times: []
}

export class setRoleDto {
    @IsString()
    @ApiProperty()
    id: string
    @IsString()
    @ApiProperty()
    role: Role
}
export class RegisterUserDto {
    @IsString()
    @ApiProperty()
    name: string
    
    @IsString()
    @ApiProperty()
    profession: string
    
    @IsArray()
    @ApiProperty({isArray: true, type: ScheduleDto })
    schedule: ScheduleDto[]
    
    @IsString()
    @ApiProperty()
    phone: string
    
    @IsString()
    @ApiProperty()
    password: string
}
export class EditUserDto {
    @IsString()
    @ApiProperty()
    id: string
    
    @IsString()
    @ApiProperty()
    name: string
    
    @IsString()
    @ApiProperty()
    profession: string
    
    @IsArray()
    @ApiProperty({isArray: true, type: ScheduleDto })
    schedule: ScheduleDto[]
    
    @IsString()
    @ApiProperty()
    phone: string
    
    @IsString()
    @ApiProperty()
    password: string
}

export class LoginUserDto {
    
    @IsString()
    @ApiProperty()
    phone: string
    
    @IsString()
    @ApiProperty()
    password: string
}