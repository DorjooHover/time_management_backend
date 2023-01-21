import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import mongoose, { Model } from "mongoose";
import { Category, CategoryDocument, Service, ServiceDocument, User, UserDocument } from "schema";
import {InjectModel, } from '@nestjs/mongoose'
import { CreateServiceDto, SetServiceDto } from "./service.dto";
import { UserService } from "../user/user.service";

@Injectable() 
export class ServiceService {
    constructor(@InjectModel(Service.name) private model: Model<ServiceDocument>, @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,@InjectModel(User.name) private userModel:Model<UserDocument>) {}

    async create(dto: CreateServiceDto) {
        let service = await this.model.findOne({name: dto.name})
        if(service) throw new HttpException('found', HttpStatus.FOUND)
        service = await this.model.create({
            name: dto.name, 
            english: dto.english,
            description: dto.description,
            price: dto.price,
            currency: dto.currency,
            duration: dto.duration,
            pre: dto.pre,
            employees: dto.employees,
            categoryId: dto.categoryId,
            href: dto.href
        })
        await this.categoryModel.findByIdAndUpdate(service.categoryId, {
            $push: {services: service}
        })
        return service
    }

    async getServices() {
        return await this.model.find()
    }

    async getServicesCategoryId(id: string) {
        return  await this.model.find({categoryId: id})

    }

    async getServiceById(id: string) {
         
        if(mongoose.Types.ObjectId.isValid(id)) {
           return  await this.model.findById(id).populate('employees', 'name schedule', this.userModel)
        } else {
            return  await this.model.findOne({href:id}).populate('employees', 'name schedule', this.userModel)
        }
       
    }

    async setService(dto: SetServiceDto) {
        let service = await this.model.findByIdAndUpdate(dto.id, {
        
                name: dto.name, 
                english: dto.english,
                description: dto.description,
                price: dto.price,
                currency: dto.currency,
                duration: dto.duration,
                pre: dto.pre,
                href: dto.href,
                employees: dto.employees,
                categoryId: dto.categoryId
       
        })
        return service
    }

    async deleteService(id: string) {
        return await this.model.findByIdAndRemove(id)
    }
}