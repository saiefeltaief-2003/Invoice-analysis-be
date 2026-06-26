import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Supplier } from "src/schemas/Supplier.schema";
import { CreateSupplierDto, UpdateSupplierDto } from "./suppliers.dto";

@Injectable()
export class SuppliersService {
    constructor(
        @InjectModel(Supplier.name) private supplierModel: Model<Supplier>
    ) {}

    createSupplier(createSupplierDto: CreateSupplierDto) {
        const newSupplier = new this.supplierModel(createSupplierDto);
        return newSupplier.save();
    }

    getAllSuppliers() {
        return this.supplierModel.find();
    }

    getSupplierById(id: string) {
        return this.supplierModel.findById(id).populate('invoices');
    }

    updateSupplier(id: string, updateSupplierDto: UpdateSupplierDto) {
        return this.supplierModel.findByIdAndUpdate(id, updateSupplierDto, {returnDocument: 'after'});
    }

    deleteSupplier(id: string) {
        return this.supplierModel.findByIdAndDelete(id);
    }
}