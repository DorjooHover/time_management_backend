import { HttpException, HttpStatus, Injectable, Inject, forwardRef } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { sign } from "jsonwebtoken";
import { Model } from "mongoose";
import { User, UserDocument } from "schema";
import appConfig from "src/config/app.config";
import { EditUserDto, LoginUserDto, RegisterUserDto, ScheduleDto } from "./user.dto";
import * as bcrypt from 'bcrypt'
import { Role } from "util/enum";
import { ServiceService } from "../service/service.service";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private model: Model<UserDocument>, @Inject(forwardRef(() => ServiceService)) private serviceService: ServiceService) {}
    async signPayload(payload) {
        return sign({ phone: payload }, appConfig().appSecret, );
      }
    async validateUser(payload: string) {
        return await this.model.findOne({phone: payload})
    }
    async login(dto: LoginUserDto) {
        let user = await this.validateUser(dto.phone);
    if (!user) throw new HttpException('wrong phone', HttpStatus.FORBIDDEN);
    const checkPassword = this.checkPassword(dto.password, user.password);
    if (checkPassword) {
      return user;
    } else {
      throw new HttpException('wrong password', HttpStatus.UNAUTHORIZED);
    }
    }
    async register(dto: RegisterUserDto) {
        try {
            let user = await this.validateUser(dto.phone);
            if (user) throw new HttpException('registered user', HttpStatus.FOUND);
            const hashed = await bcrypt.hash(dto.password, 10);
            user = await this.model.create({
              name: dto.name ,
              password: hashed,
              schedule: dto.schedule,
              profession: dto.profession, 
              phone: dto.phone,
              role: Role.employee
            });
      
            return user;
          } catch (e) {
            throw new HttpException(e.message, HttpStatus.FORBIDDEN);
          }
    }
    async checkPassword(password: string, checkPassword: string) {
        bcrypt.compare(password, checkPassword, (err, result) => {
          if (result) {
            return true;
          } else {
            return false;
          }
        });
      }
    async allUsers() {
        return await this.model.find()
    }

    async getUserById(id: string) {
      console.log(id)
      let user = await this.model.findById(id)
      console.log(user)
      return user
    }
    async editUser(dto:EditUserDto) {
        const hashed = await bcrypt.hash(dto.password, 10);
        return await this.model.findByIdAndUpdate(dto.id, {
            name: dto.name ,
            password: hashed,
            schedule: dto.schedule,
            profession: dto.profession, 
            phone: dto.phone
        })
    }
    async setTime(dto: ScheduleDto, id: string) {
        return await this.model.findByIdAndUpdate(id, {
            schedule: dto,
        })
    }
    async setRole(role: Role, id: string) {
        return await this.model.findByIdAndUpdate(id, {
            role: role
        })
    }
    async deleteUser(id: string) {
        return this.model.findByIdAndRemove(id)
    }
}