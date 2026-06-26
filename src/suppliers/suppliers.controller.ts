import { Body, Controller, Post, Get, Param, HttpException, Patch, Delete } from "@nestjs/common";
import { SuppliersService } from "./suppliers.service";
import { CreateSupplierDto, UpdateSupplierDto } from "./suppliers.dto";
import mongoose from "mongoose";

@Controller('suppliers')
export class SuppliersController {
    constructor(private supplierService: SuppliersService) {}

    @Post()
    createSupplier(@Body() createSupplierDto: CreateSupplierDto) {
        return this.supplierService.createSupplier(createSupplierDto);
    }

    @Get()
    getAllSuppliers() {
        return this.supplierService.getAllSuppliers();
    }

    @Get(':id')
    getSupplierById(@Param('id') id: string) {
        const validId = mongoose.Types.ObjectId.isValid(id);
        if (!validId) throw new HttpException('Invalid ID.', 400);
        const supplier = this.supplierService.getSupplierById(id);
        if (!supplier) throw new HttpException('Supplier not found', 404);
        return supplier;
    }

    @Patch()
    updateSupplier(@Body() updateSupplierDto: UpdateSupplierDto) {
        const id = updateSupplierDto.id!;
        const validId = mongoose.Types.ObjectId.isValid(id);
        if (!validId) throw new HttpException('Invalid ID.', 400);
        const result = this.supplierService.updateSupplier(id, updateSupplierDto);
        if (!result) throw new HttpException('Supplier not found.', 404);
        return result;
    }

    @Delete(':id')
    deleteSupplier(@Param('id') id: string) {
        const validId = mongoose.Types.ObjectId.isValid(id);
        if (!validId) throw new HttpException('Invalid ID.', 400);
        const result = this.supplierService.deleteSupplier(id);
        if (!result) throw new HttpException('Supplier not found', 404);
        return result;
    }
}