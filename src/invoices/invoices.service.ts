import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Invoice } from "src/schemas/Invoice.schema";
import { CreateInvoiceDto, UpdateInvoiceDto } from "./invoices.dto";
import { User } from "src/schemas/User.schema";
import { Supplier } from "src/schemas/Supplier.schema";

@Injectable()
export class InvoicesService {
    constructor(
        @InjectModel(Invoice.name) private invoiceModel: Model<Invoice>,
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(Supplier.name) private supplierModel: Model<Supplier>
    ) {}

    async createInvoice(createInvoiceDto: CreateInvoiceDto) {
        const user = await this.userModel.findById(createInvoiceDto.user);
        if (!user) throw new HttpException('User with ID not found', 404);
        const supplier = await this.userModel.findById(createInvoiceDto.supplier);
        if (!supplier) throw new HttpException('Supplier with ID not found', 404);

        const invoice = new this.invoiceModel(createInvoiceDto);
        const savedInvoice = await invoice.save();
        
        await user.updateOne({
            $push: {
                invoices: savedInvoice._id,
            }
        }).exec();
        await supplier.updateOne({
            $push: {
                invoices: savedInvoice._id,
            }
        }).exec();
        return savedInvoice;
    }

    getAllInvoices() {
        return this.invoiceModel.find().populate('user').populate('supplier');
    }

    getInvoiceById(id: string)
    {
        return this.invoiceModel.findById(id);
    }
    
    updateInvoice(id: string, updateInvoiceDto: UpdateInvoiceDto) {
        return this.invoiceModel.findByIdAndUpdate(id, updateInvoiceDto, {returnDocument: 'after'});
    }

    async deleteInvoice(id: string) {
        const invoice = await this.invoiceModel.findById(id);
        if (!invoice) throw new HttpException('Invoice not found.', 404);
        const user = await this.userModel.findById(invoice.user);
        if (!user) throw new HttpException('User with invoice not found.', 404);
        const supplier = await this.supplierModel.findById(invoice.supplier);
        if (!supplier) throw new HttpException('Supplier with invoice not found.', 404);

        await user.updateOne({
            $pull: {
                invoices: invoice._id,
            }
        });
        await supplier.updateOne({
            $pull: {
                invoices: invoice._id,
            }
        });

        return invoice.deleteOne();
    }
}