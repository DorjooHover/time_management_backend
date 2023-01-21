import { ForbiddenException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import {InjectModel} from '@nestjs/mongoose'
import { Category, CategoryDocument } from "schema/category.schema";
import { CreateCategoryDto, SetCategoryDto } from "./category.dto";

@Injectable()
export class CategoryService {
    constructor(@InjectModel(Category.name) private model: Model<CategoryDocument>) {}

    async createCategory(dto: CreateCategoryDto) {
        let category = await this.model.findOne({name: dto.name})
        if(category) throw new HttpException('Бүртгэгдсэн ангалал байна.', HttpStatus.FOUND)
        try {
            category = await this.model.create({
                name: dto.name,
                english: dto.english
            })
        } catch (e) {
            throw new ForbiddenException(e.message)
        }
        return category
    }

    async getCategories() {
        let categories = await this.model.find()
        if(!categories) throw new HttpException('not found', HttpStatus.FOUND)
        return categories
    }

    async getCategoryById(id: string) {
        let category = await this.model.findById(id)
        if(!category) throw new HttpException('not found', HttpStatus.FOUND)
        return category
    }

    async updateCategory(dto: SetCategoryDto) {
        let category = await this.model.findByIdAndUpdate(dto.id, {
            name: dto.name,
            english: dto.english
        })
        return category
    }

    async deleteCategoryById(id:string) {
        let category = await this.model.findByIdAndRemove(id)
        return category
    }
}