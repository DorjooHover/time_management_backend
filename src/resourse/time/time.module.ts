import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Time, TimeSchema } from "schema";
import { TimeController } from "./time.controller";
@Module({
    imports: [MongooseModule.forFeature([{name: Time.name, schema: TimeSchema}])],
    controllers: [TimeController],
    providers: []
})
export class TimeModule {}