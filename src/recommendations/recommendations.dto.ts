import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateRecommendationDto {
    @IsNotEmpty({message: "The recommendation title is required."})
    @IsString({message: "The recommendation title is not valid."})
    title?: string;

    @IsNotEmpty({message: "The recommendation description is required."})
    @IsString({message: "The recommendation description is not valid."})
    description?: string;

    @IsNotEmpty({message: "The user Id is required."})
    @IsString({message: "The user Id is not valid."})
    user?: string;
}

export class UpdateRecommendationDto {
    @IsNotEmpty({message: "The recommendation ID is required."})
    @IsString({message: "The recommendation ID is not valid."})
    id?: string;

    @IsOptional()
    @IsString({message: "The recommendation title is not valid."})
    title?: string;

    @IsOptional()
    @IsString({message: "The recommendation description is not valid."})
    description?: string;
}