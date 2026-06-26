import { Body, Controller, Post, Get, Param, Patch, Delete, HttpException } from "@nestjs/common";
import { RecommendationsService } from "./recommendations.service";
import { CreateRecommendationDto, UpdateRecommendationDto } from "./recommendations.dto";
import mongoose from "mongoose";

@Controller('recommendations')
export class RecommendationsController {
    constructor(private recommendationsService: RecommendationsService) {}

    @Post()
    createRecommendation(@Body() createRecommendationDto: CreateRecommendationDto) {
        return this.recommendationsService.createRecommendation(createRecommendationDto);
    }

    @Get()
    getAllRecommendations() {
        return this.recommendationsService.getAllRecommendations();
    }

    @Get(':id')
    getRecommendationById(@Param('id') id: string) {
            const validId = mongoose.Types.ObjectId.isValid(id);
            if (!validId) throw new HttpException('Invalid ID.', 400);
            const recommendation = this.recommendationsService.getRecommendationById(id);
            if (!recommendation) throw new HttpException('Recommendation not found', 404);
            return recommendation;
    }
    
    @Patch()
    updateRecommendation(@Body() updateRecommendationDto: UpdateRecommendationDto) {
            const id = updateRecommendationDto.id!;
            const validId = mongoose.Types.ObjectId.isValid(id);
            if (!validId) throw new HttpException('Invalid ID.', 400);
            const result = this.recommendationsService.updateRecommendation(id, updateRecommendationDto);
            if (!result) throw new HttpException('Recommendation not found.', 404);
            return result;
    }

    @Delete(':id')
    deleteRecommendation(@Param('id') id: string) {
        const validId = mongoose.Types.ObjectId.isValid(id);
        if (!validId) throw new HttpException('Invalid ID.', 400);
        const result = this.recommendationsService.deleteRecommendation(id);
        if (!result) throw new HttpException('Recommendation not found', 404);
        return result;
    }
}