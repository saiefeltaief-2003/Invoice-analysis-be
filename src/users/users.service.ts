import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/schemas/User.schema";
import { CreateUserDto, LoginUserDto, UpdateUserDto } from "./users.dto";
import bcrypt from "bcrypt";

@Injectable()
export class UsersService {
    private readonly saltRounds = 10;
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async registerUser(registerUserDto: CreateUserDto) {
        return new this.userModel({
            ...registerUserDto,
            password: await bcrypt.hash(registerUserDto.password!, this.saltRounds)
        }).save();
    }

    async login(loginUserDto: LoginUserDto) {
        const user: any = await this.userModel.findOne({email: loginUserDto.email});
        if (!user) throw new HttpException('User with email not found.', 404);
        
        const isMatch = await bcrypt.compare(loginUserDto.password!, user.password);
        if (!isMatch) {
            throw new HttpException('Invalid password', 401);
        }

        return user;
    }

    createUser(createUserDto: CreateUserDto) {
        const newUser = new this.userModel(createUserDto);
        return newUser.save();
    }

    getAllUsers() {
        return this.userModel.find().populate('invoices');
    }

    getUserById(id: string) {
        return this.userModel.findById(id).populate('invoices');
    }

    updateUser(id: string, updateUserDto: UpdateUserDto) {
        return this.userModel.findByIdAndUpdate(id, updateUserDto, {returnDocument: 'after'});
    }

    deleteUser(id: string) {
        return this.userModel.findByIdAndDelete(id);
    }
}