import { Body, Controller, Delete, Get, Post, Put, Query } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { CreateServiceDto, SetServiceDto } from "./service.dto";
import { ServiceService } from "./service.service";

@Controller('service')
@ApiTags('Service')
export class ServiceController {
    constructor(private service: ServiceService) {}
    @Post()
    create(@Body() dto: CreateServiceDto) {
        return this.service.create(dto)
    }

    @Get()
    getAll() {
        return this.service.getServices()
    }

    @Get(':id')
    @ApiQuery({name: 'id'})
    getServiceById(@Query('id') id: string) {
        return this.service.getServiceById(id)
    }
    
    @Put()
    setService(@Body() dto: SetServiceDto) {
        return this.service.setService(dto)
    }
    
    @Delete(':id')
    @ApiQuery({name: 'id'})
    deleteServiceById(@Query('id') id: string) {
        return this.service.deleteService(id)
    }

}