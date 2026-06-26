import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Invoice } from "./Invoice.schema";
import mongoose from "mongoose";

@Schema()
export class Supplier {
    @Prop({required: true})
    name?: string;

    @Prop({required: true})
    address?: string;

    @Prop({required: true})
    contact?: string;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Invoice'}]})
    invoices?: Invoice[];
}

export const SupplierSchema = SchemaFactory.createForClass(Supplier);