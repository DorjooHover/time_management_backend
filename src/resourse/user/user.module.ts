import { Global, Module } from "@nestjs/common";
import { forwardRef } from "@nestjs/common/utils";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { ServiceSchema, User, UserSchema, Service, Category, CategorySchema } from "schema";
import appConfig from "src/config/app.config";
import { ServiceModule } from "../service/service.module";
import { ServiceService } from "../service/service.service";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Global()
@Module({
    imports: [JwtModule.register({
        secretOrPrivateKey: appConfig().appSecret, signOptions: {expiresIn: 60 * 60 * 24}
    }), MongooseModule.forFeature([{name: User.name, schema: UserSchema}, {name: Service.name, schema: ServiceSchema}, {name: Category.name, schema: CategorySchema}])],
    controllers: [UserController],
    providers: [UserService, ServiceService],
    exports: [UserService]
})

export class UserModule {}