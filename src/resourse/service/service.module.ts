import { forwardRef, Module } from "@nestjs/common";
import {MongooseModule} from '@nestjs/mongoose'
import { Category, CategorySchema, Service, ServiceSchema, User, UserSchema } from "schema";
import { UserModule } from "../user/user.module";
import { UserService } from "../user/user.service";
import { ServiceController } from "./service.controller";
import { ServiceService } from "./service.service";
@Module({
    imports: [MongooseModule.forFeature([{name: Service.name, schema: ServiceSchema}, {name: Category.name, schema: CategorySchema},{name: User.name, schema: UserSchema} ]), ],
    controllers: [ServiceController],
    providers: [ServiceService, UserService],
    exports: [ServiceService]
})
export class ServiceModule {}