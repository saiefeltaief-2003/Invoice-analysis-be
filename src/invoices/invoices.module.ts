import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Invoice, InvoiceSchema } from "src/schemas/Invoice.schema";
import { User, UserSchema } from "src/schemas/User.schema";
import { InvoicesController } from "./invoices.controller";
import { InvoicesService } from "./invoices.service";
import { Supplier, SupplierSchema } from "src/schemas/Supplier.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Invoice.name,
                schema: InvoiceSchema
            },
            {
                name: User.name,
                schema: UserSchema
            },
            {
                name: Supplier.name,
                schema: SupplierSchema
            }
        ]),
    ],
    controllers: [InvoicesController],
    providers: [InvoicesService]
})
export class InvoicesModule {}