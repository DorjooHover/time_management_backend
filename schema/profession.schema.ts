import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";


export type ProfessionDocument = Document & Profession

@Schema({timestamps: true})
export class Profession  {
    @Prop({required: true})
    name: string

}

export const ProfessionSchema = SchemaFactory.createForClass(Profession)