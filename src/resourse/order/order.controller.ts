import { Controller, Delete, Get, HttpException, HttpStatus, Patch, Post, Put, Query } from "@nestjs/common";
import { Body } from "@nestjs/common/decorators";
import { InjectModel } from "@nestjs/mongoose";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { Model } from "mongoose";
import { Order, OrderDocument } from "schema/order.schema";
import { OrderStatus } from "util/enum";
import { CreateOrderDto, SetOrderDto, SetOrderStatusDto } from "./order.dto";

@Controller('order')
@ApiTags('Order')
export class OrderController {
    constructor(@InjectModel(Order.name) private model:Model<OrderDocument>) {}

    @Post()
    async create(@Body() dto: CreateOrderDto) {
        let order = await this.model.create({
            userId: dto.userId,
            serviceId: dto.serviceId,
            time: dto.time,
            date: dto.date,
            phone: dto.phone,
            email: dto.email,

        })
        return order
    }

    @Get()
    async getAllPending() {
        return await this.model.find({status: OrderStatus.pending})
    }

    @Get(':id')
    @ApiQuery({name: 'id'})
    async getOrderById(@Query('id') id: string) {
        let order = await this.model.findById(id)
        if(!order) throw new HttpException('not found', HttpStatus.NOT_FOUND)
        return order
    }

    @Put()
    async setOrder(dto: SetOrderDto) {
        return await this.model.findByIdAndUpdate(dto.id, {
            userId: dto.userId,
            serviceId: dto.serviceId,
            time: dto.time,
            date: dto.date,
            phone: dto.phone,
            email: dto.email,
            statis: dto.status,
        })
    }

    @Patch()
    async setStatus(dto: SetOrderStatusDto) {
        return await this.model.findByIdAndUpdate(dto.id, {
            statis: dto.status,
        })
    }

    @Delete(':id')
    @ApiQuery({name: 'id'})
    async delete(@Query('id') id: string) {
        return await this.model.findByIdAndRemove(id)
    }

}