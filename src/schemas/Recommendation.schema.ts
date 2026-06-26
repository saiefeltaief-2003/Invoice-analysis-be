import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class Recommendation {
    @Prop({required: true})
    title?: string;

    @Prop({required: true})
    description?: string;

    @Prop({default: Date.now})
    createdAt?: Date;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user?: string;
}

export const RecommendationSchema = SchemaFactory.createForClass(Recommendation);