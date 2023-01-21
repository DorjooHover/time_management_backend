import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { OrderStatus } from "util/enum";
import { Service } from "./service.schema";
import { User } from "./user.schema";


export type OrderDocument = Document & Order

@Schema({timestamps: true})
export class Order  {
    @Prop({required: true, type: mongoose.Types.ObjectId, ref: 'users'})
    userId: User

    @Prop({required: true, type: mongoose.Types.ObjectId, ref: 'services'})
    serviceId: Service

    @Prop({required: true})
    time: string

    @Prop({required: true})
    date: string

    @Prop()
    phone: string

    @Prop()
    email: string

    @Prop({type: String, enum: OrderStatus, default: OrderStatus.pending})
    status: OrderStatus

    
}

export const OrderSchema = SchemaFactory.createForClass(Order)