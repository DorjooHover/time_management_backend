import { Controller, Post, Get, Body , HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ApiTags } from "@nestjs/swagger";
import { Model } from "mongoose";
import { Time, TimeDocument } from "schema";
import { CreateTimeDto } from "./time.dto";
@Controller('time')
@ApiTags('Time')
export class TimeController {
    constructor(@InjectModel(Time.name) private model: Model<TimeDocument>) {}

    @Post()
    async creatTime(@Body() dto: CreateTimeDto) {
        let time = await this.model.findOne({time: dto.name})
        if(time) throw new HttpException('found', HttpStatus.FOUND)
        time = await this.model.create({
            time: dto.name
        })
        return time
    }

    @Get()
    async getTime() {
        return await this.model.find()
    }
}