import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "./User.schema";
import mongoose from "mongoose";
import { Supplier } from "./Supplier.schema";
import { InvoiceCategory, InvoiceStatus } from "src/enums/invoices.enum";

@Schema()
export class Invoice {
    @Prop({required: true})
    number?: string;

    @Prop({default: Date.now})
    date?: Date

    @Prop({required: true})
    totalPrice?: number

    @Prop({enum: Object.values(InvoiceCategory), default: 'other'})
    category?: string

    @Prop({enum: Object.values(InvoiceStatus), default: 'pending'})
    status?: string

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user?: User

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Supplier'})
    supplier?: Supplier

    // is the file path really needed as a prop? it can just be computed as (invoices path)\(invoice object id)
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);