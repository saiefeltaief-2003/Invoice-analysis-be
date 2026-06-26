import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Recommendation } from "src/schemas/Recommendation.schema";
import { CreateRecommendationDto, UpdateRecommendationDto } from "./recommendations.dto";
import { User } from "src/schemas/User.schema";

@Injectable()
export class RecommendationsService {
    constructor(
        @InjectModel(Recommendation.name) private recommendationModel: Model<Recommendation>,
        @InjectModel(User.name) private userModel: Model<User>
    ) {}
    
    async createRecommendation(createRecommendationDto: CreateRecommendationDto) {
        const user = await this.userModel.findById(createRecommendationDto.user);
        if (!user) throw new HttpException('User with ID not found', 404);

        const newRecommendation = new this.recommendationModel(createRecommendationDto);
        const savedRecommendation = await newRecommendation.save();

        await user.updateOne({
            $push: {
                recommendations: savedRecommendation._id,
            }
        }).exec();

        return savedRecommendation;
    }

    getAllRecommendations() {
        return this.recommendationModel.find().populate('user');
    }

    getRecommendationById(id: string) {
        return this.recommendationModel.findById(id).populate('user');
    }

    updateRecommendation(id: string, updateRecommendationDto: UpdateRecommendationDto) {
        return this.recommendationModel.findByIdAndUpdate(id, updateRecommendationDto, { new: true }).populate('user');
    }

    async deleteRecommendation(id: string) {
        const recommendation = await this.recommendationModel.findById(id);
        if (!recommendation) throw new HttpException('Recommendation not found.', 404);
        const user = await this.userModel.findById(recommendation.user);
        if (!user) throw new HttpException('User with recommendation not found.', 404);

        await user.updateOne({
            $pull: {
                recommendations: recommendation._id,
            }
        }).exec();
        
        return this.recommendationModel.findByIdAndDelete(id);
    }
}