import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";

export class RegisterUserDto {
    @IsNotEmpty({message: "The username cannot be empty."})
    @IsString({message: "The username is not valid."})
    username?: string;

    @IsNotEmpty({message: "The Email cannot be empty."})
    @IsEmail({}, {message: "This Email address is not valid."})
    email?: string;

    @IsNotEmpty({message: "The password cannot be empty."})
    @MinLength(5, {message: "The password must have at least 5 characters."})
    @MaxLength(30, {message: "The password is too long."})
    //@IsStrongPassword({}, {message: "This password is too weak."})
    password?: string;
}

export class LoginUserDto {
    @IsNotEmpty({message: "The Email cannot be empty."})
    @IsEmail({}, {message: "This Email address is not valid."})
    email?: string;

    @IsNotEmpty({message: "The password cannot be empty."})
    password?: string;
}

export class CreateUserDto {
    @IsNotEmpty({message: "The username cannot be empty."})
    @IsString({message: "The username is not valid."})
    username?: string;

    @IsNotEmpty({message: "The Email cannot be empty."})
    @IsEmail({}, {message: "This Email address is not valid."})
    email?: string;

    @IsNotEmpty({message: "The password cannot be empty."})
    @MinLength(5, {message: "The password must have at least 5 characters."})
    @MaxLength(30, {message: "The password is too long."})
    //@IsStrongPassword({}, {message: "This password is too weak."})
    password?: string;

    // TODO add password confirmation
}

export class UpdateUserDto {
    @IsNotEmpty()
    id?: string;

    @IsOptional()
    @IsString({message: "The username is not valid."})
    username?: string;

    @IsOptional()
    @MinLength(5, {message: "The password must have at least 5 characters."})
    @MaxLength(30, {message: "The password is too long."})
    //@IsStrongPassword({}, {message: "This password is too weak."})
    password?: string;
}