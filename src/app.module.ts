import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import { UserModule } from './resourse/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './resourse/category/category.module';
import { Profession } from 'schema';
import { ProfessionModule } from './resourse/profession/profession.module';
import { OrderModule } from './resourse/order/order.module';
import { ServiceModule } from './resourse/service/service.module';
import { TimeModule } from './resourse/time/time.module';
import { forwardRef } from '@nestjs/common/utils';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:'.env'
    }),
    MongooseModule.forRoot( appConfig().dbUrl, {
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
      dbName: appConfig().dbName
    }),
    forwardRef(() => UserModule),
    forwardRef(() => ServiceModule),
    UserModule, CategoryModule, ProfessionModule, OrderModule, ServiceModule, TimeModule],

})
export class AppModule {}
