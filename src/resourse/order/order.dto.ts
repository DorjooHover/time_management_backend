import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsString } from "class-validator";
import { OrderStatus } from "util/enum";

export class CreateOrderDto {
    @IsString()
    @ApiProperty()
    name: string

    @IsEmail()
    @ApiProperty()
    email: string

    @IsString()
    @ApiProperty({minLength: 8})
    phone: string

    @IsString()
    @ApiProperty()
    userId: string

    @IsString()
    @ApiProperty()
    serviceId: string

    @IsString()
    @ApiProperty()
    time: string

    @IsString()
    @ApiProperty()
    date: string

}
export class SetOrderDto {

    @IsString()
    @ApiProperty()
    id: string
    
    @IsString()
    @ApiProperty()
    name: string

    @IsEmail()
    @ApiProperty()
    email: string

    @IsString()
    @ApiProperty({minLength: 8})
    phone: string

    @IsString()
    @ApiProperty()
    userId: string

    @IsString()
    @ApiProperty()
    serviceId: string

    @IsString()
    @ApiProperty()
    time: string

    @IsString()
    @ApiProperty()
    date: string

    @ApiProperty({enum: OrderStatus, default: OrderStatus.pending})
    @IsEnum({type: OrderStatus})
    status: OrderStatus
}
export class SetOrderStatusDto {

    @IsString()
    @ApiProperty()
    id: string
    
    @ApiProperty({enum: OrderStatus, default: OrderStatus.pending})
    @IsEnum({type: OrderStatus})
    status: OrderStatus
}