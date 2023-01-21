import { Body, Controller, Delete, Get, HttpException, HttpStatus, Post, Put, Query } from "@nestjs/common";
import {InjectModel} from '@nestjs/mongoose'
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { Model } from "mongoose";
import { Profession, ProfessionDocument } from "schema";
import { ProfessionCreateDto, ProfessionSetDto } from "./profession.dto";
@Controller('profession')
@ApiTags('Profession')
export class ProfessionController{
    constructor(@InjectModel(Profession.name) private model: Model<ProfessionDocument>){}

    @Post()
    async create(@Body() dto:ProfessionCreateDto) {
        let profession = await this.model.findOne({name: dto.name}) 
        if(profession) throw new HttpException('found', HttpStatus.FOUND)
        profession = await this.model.create({
            name: dto.name
        })
        return profession
    }

    @Get()
    async all() {
        let professions = await this.model.find()
        if(!professions) throw new HttpException('not found', HttpStatus.NOT_FOUND)
        return professions
    }

    @Put()
    async set(@Body() dto: ProfessionSetDto ) {
        let profession = await this.model.findByIdAndUpdate(dto.id, {
            name: dto.name
        })
        return profession
    }

    @Delete(':id')
    @ApiQuery({name: 'id'})
    async delete(@Query('id') id: string) {
        let profession = await this.model.findByIdAndRemove(id)
        return profession
    }
}