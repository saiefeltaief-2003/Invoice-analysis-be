import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Invoice } from "./Invoice.schema";
import mongoose from "mongoose";
import { Recommendation } from "./Recommendation.schema";

@Schema()
export class User {
    @Prop({ unique: true, required: true })
    username!: string;

    @Prop({ unique: true, required: true })
    email!: string;

    @Prop({ required: true })
    password!: string;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Invoice'}]})
    invoices!: Invoice[];

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Recommendation'}]})
    recommedations!: Recommendation[];
}

export const UserSchema = SchemaFactory.createForClass(User);