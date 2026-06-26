import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { InvoiceCategory, InvoiceStatus } from "../enums/invoices.enum";

export class CreateInvoiceDto {
    @IsOptional()
    // @IsDate({message: "The invoice date value is not a date."})
    date?: Date;

    @IsNumber({allowInfinity: false, allowNaN: false}, {message: "The total price must be a number."})
    @Min(0.0, {message: "The total price is not a valid price."})
    totalPrice?: number;

    @IsOptional()
    @IsEnum(InvoiceCategory, {message: "The invoice category is invalid."})
    category?: string;

    @IsOptional()
    @IsEnum(InvoiceStatus, {message: "The invoice status is invalid."})
    status?: string;

    @IsNotEmpty({message: "The user Id is required."})
    @IsString({message: "The user Id is not valid."})
    user?: string;

    @IsNotEmpty({message: "The supplier Id is required."})
    @IsString({message: "The supplier Id is not valid."})
    supplier?: string;
}

export class UpdateInvoiceDto {
    @IsNotEmpty()
    id?: string;

    @IsOptional()
    date?: Date;

    @IsOptional()
    @IsNumber({allowInfinity: false, allowNaN: false}, {message: "The total price must be a number."})
    @Min(0.0, {message: "The total price is not a valid price."})
    totalPrice?: number;

    @IsOptional()
    @IsNotEmpty({message: "The user Id is required."})
    @IsString({message: "The user Id is not valid."})
    user?: string;

    @IsOptional()
    @IsNotEmpty({message: "The supplier Id is required."})
    @IsString({message: "The supplier Id is not valid."})
    supplier?: string;
}