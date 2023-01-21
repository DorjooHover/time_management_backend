import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Category } from "./category.schema";
import { User } from "./user.schema";



export type ServiceDocument = Document & Service

@Schema({timestamps: true})
export class Service  {
    @Prop({required: true})
    name: string

    @Prop()
    english: string

    @Prop()
    description: string
    
    @Prop()
    price: string

    @Prop()
    currency: string

    @Prop()
    duration: string

    @Prop()
    pre: string

    @Prop({type: mongoose.Types.Array, ref: 'users'})
    employees: User[]

    @Prop({type: mongoose.Types.ObjectId, ref: 'categories'})
    categoryId: Category[]



}

export const ServiceSchema = SchemaFactory.createForClass(Service)