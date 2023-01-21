import { Module } from "@nestjs/common";
import {MongooseModule} from '@nestjs/mongoose'
import { Profession, ProfessionSchema } from "schema";
import { ProfessionController } from "./profession.controller";
@Module({
    imports: [MongooseModule.forFeature([{name: Profession.name, schema: ProfessionSchema}])],
    controllers: [ProfessionController],
})
export class ProfessionModule{}