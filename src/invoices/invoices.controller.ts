import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post } from "@nestjs/common";
import { InvoicesService } from "./invoices.service";
import { CreateInvoiceDto, UpdateInvoiceDto } from "./invoices.dto";
import mongoose from "mongoose";

@Controller('invoices')
export class InvoicesController {
    constructor(private invoicesService: InvoicesService) {}

    @Post()
    createInvoice(@Body() createInvoiceDto: CreateInvoiceDto) {
        return this.invoicesService.createInvoice(createInvoiceDto);
    }

    @Get()
    getAllInvoices() {
        return this.invoicesService.getAllInvoices();
    }

    @Get(':id')
    getInvoiceById(@Param('id') id: string) {
        const validId = mongoose.Types.ObjectId.isValid(id);
        if (!validId) throw new HttpException('Invalid ID.', 400);
        const invoice = this.invoicesService.getInvoiceById(id);
        if (!invoice) throw new HttpException('Invoice not found', 404);
        return invoice;
    }

    @Patch()
    updateInvoice(@Body() updateInvoiceDto: UpdateInvoiceDto) {
        const id = updateInvoiceDto.id!;
        const validId = mongoose.Types.ObjectId.isValid(id);
        if (!validId) throw new HttpException('Invalid ID.', 400);
        const result = this.invoicesService.updateInvoice(id, updateInvoiceDto);
        if (!result) throw new HttpException('Invoice not found.', 404);
        return result;
    }

    @Delete(':id')
    deleteInvoice(@Param('id') id: string) {
        const validId = mongoose.Types.ObjectId.isValid(id);
        if (!validId) throw new HttpException('Invalid ID.', 400);
        const result = this.invoicesService.deleteInvoice(id);
        if (!result) throw new HttpException('Invoice not found', 404);
        return result;
    }
}