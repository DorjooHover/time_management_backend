import { Body, Controller, Delete, Get, Patch, Post, Put, Query } from "@nestjs/common";
import { ApiQuery } from "@nestjs/swagger";
import { EditUserDto, LoginUserDto, RegisterUserDto, ScheduleDto, setRoleDto } from "./user.dto";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
    constructor(private service: UserService) {}

    @Post('login')
    login(@Body() dto: LoginUserDto) {
        return this.service.login(dto)
    }
    @Post('register')
    register(@Body() dto: RegisterUserDto) {
        return this.service.register(dto)
    }

    @Get()
    allUsers() {
        return this.service.allUsers()
    }

    @Patch()
    editUser(@Body() dto: EditUserDto) {
        return this.service.editUser(dto)
    }

    @Put()
    setTime(@Body() dto: ScheduleDto[]) {
       return  dto.map(async (d) => 
        await this.service.setTime(d, 'as')
        )
    }
    @Put("/role")
    setRole(@Body() dto: setRoleDto) {
       return this.service.setRole(dto.role, dto.id)
    }

    @Delete(':id')
    @ApiQuery({name: 'id'})
    deleteUser(@Query('id') id: string) {
        return this.service.deleteUser(id)
    }
}
