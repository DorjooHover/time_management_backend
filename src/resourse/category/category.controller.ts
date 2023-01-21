import { Body, Controller, Delete, Get, Post, Put, Query } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { CreateCategoryDto, SetCategoryDto } from "./category.dto";
import { CategoryService } from "./category.service";

@Controller('category')
@ApiTags('Category')
export class CategoryController {
    constructor(private service: CategoryService) {}
    @Post()
    createCategory(@Body() dto: CreateCategoryDto) {
        return this.service.createCategory(dto)
    }

    @Get()
    getAllCategories() {
        return this.service.getCategories()
    }

    @Get(":id")
    @ApiQuery({name: 'id'})
    getCategoryById(@Query('id') id:string) {
        return this.service.getCategoryById(id)
    }

    @Put()
    setCategory(@Body() dto: SetCategoryDto) {
        return this.service.updateCategory(dto)
    }

    @Delete('id')
    @ApiQuery({name: 'id'})
    deleteCategoryById(@Query('id') id: string) {
        return this.service.deleteCategoryById(id)
    }

}