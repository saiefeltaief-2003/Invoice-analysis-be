import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Recommendation, RecommendationSchema } from "src/schemas/Recommendation.schema";
import { RecommendationsController } from "./recommendations.controller";
import { RecommendationsService } from "./recommendations.service";
import { User, UserSchema } from "src/schemas/User.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Recommendation.name,
                schema: RecommendationSchema
            },
            {
                name: User.name,
                schema: UserSchema
            },
        ]),
    ],
    controllers: [RecommendationsController],
    providers: [RecommendationsService]
})
export class RecommendationsModule {}