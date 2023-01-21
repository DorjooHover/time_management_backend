import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Model } from "mongoose";
import { Profession } from "./profession.schema";
import { Role } from "util/enum";

export type UserDocument = Document & User

@Schema({timestamps: true})
export class User  {
    @Prop({required: true})
    name: string

    @Prop({type: mongoose.Types.ObjectId, ref: 'professions'})
    profession: Profession
    
    @Prop({length: 7})
    schedule: [{
        day: string,
        times: []
    }]

    @Prop({required: true})
    phone: string
    
    @Prop({required: true})
    password: string
    
    @Prop({type: String, enum: Role, default: Role.employee})
    role: Role

}

export const UserSchema = SchemaFactory.createForClass(User)
export const UserModel = Model<UserDocument>