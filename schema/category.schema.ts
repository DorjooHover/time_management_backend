import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Service } from "./service.schema";


export type CategoryDocument = Document & Category

@Schema({timestamps: true})
export class Category  {
    @Prop({required: true})
    name: string
    
    @Prop()
    english: string

    @Prop()
    services: Service[]

}

export const CategorySchema = SchemaFactory.createForClass(Category)