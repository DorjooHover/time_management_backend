import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";


export type TimeDocument = Document & Time

@Schema({timestamps: true})
export class Time  {

    @Prop({required: true})
    time: string
}

export const TimeSchema = SchemaFactory.createForClass(Time)