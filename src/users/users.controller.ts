import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto, LoginUserDto, UpdateUserDto } from "./users.dto";
import mongoose from "mongoose";

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post('register')
    async registerUser(@Body() registerUserDto: CreateUserDto) {
        const user = await this.usersService.registerUser(registerUserDto);
        if (!user) throw new HttpException('Registration failed.', 400);
        return user;
    }

    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto) {
        const user = await this.usersService.login(loginUserDto);
        if (!user) throw new HttpException('Login failed.', 400);
        return user;
    }

    @Post()
    // if you want to enable validation seperately for each endpoint. in my case i enabled it globally
    //@UsePipes(new ValidationPipe())
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @Get()
    getAllUsers() {
        return this.usersService.getAllUsers(); 
    }

    @Get(':id')
    async getUserById(@Param('id') id: string) {
        const validId = mongoose.Types.ObjectId.isValid(id);
        if (!validId) throw new HttpException('Invalid ID.', 400);
        const user = await this.usersService.getUserById(id);
        if (!user) throw new HttpException('User not found.', 404);
        return user;
    }

    @Patch()
    async updateUser(@Body() updateUserDto: UpdateUserDto) {
        const id = updateUserDto.id!;
        const validId = mongoose.Types.ObjectId.isValid(id);
        if (!validId) throw new HttpException('Invalid ID.', 400);
        const result = await this.usersService.updateUser(id, updateUserDto);
        if (!result) throw new HttpException('User not found.', 404);
        return result;
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        const validId = mongoose.Types.ObjectId.isValid(id);
        if (!validId) throw new HttpException('Invalid ID.', 400);
        const result = await this.usersService.deleteUser(id);
        if (!result) throw new HttpException('User not found.', 404);
        return result;
    }
}