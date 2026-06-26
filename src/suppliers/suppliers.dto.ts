import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateSupplierDto {
    @IsNotEmpty({message: "The supplier name is required."})
    @IsString({message: "The supplier name is not valid."})
    name?: string;

    @IsNotEmpty({message: "The supplier address is required."})
    @IsString({message: "The supplier address is not valid."})
    address?: string;

    @IsNotEmpty({message: "The supplier contact is required."})
    @IsString({message: "The supplier contact is not valid."})
    contact?: string;
}

export class UpdateSupplierDto {
    @IsNotEmpty({message: "The supplier ID is required."})
    @IsString({message: "The supplier ID is not valid."})
    id?: string

    @IsOptional()
    @IsString({message: "The supplier name is not valid."})
    name?: string;

    @IsOptional()
    @IsString({message: "The supplier address is not valid."})
    address?: string;

    @IsOptional()
    @IsString({message: "The supplier contact is not valid."})
    contact?: string;
}