import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Product, ProductDocument } from './product.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { PaginationService } from '../common/services/pagination.service';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<ProductDocument>,
        private readonly paginationService: PaginationService
    ) {}

    async findAll(paginationQueryDto: PaginationQueryDto): Promise<any> {
        return await this.paginationService.paginate(this.productModel, paginationQueryDto);
    }

    async findOne(id: string): Promise<Product> {
        const product = await this.productModel.findById(id);
        if (!product) {
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        }
        return product;
    }

    async create(createProductDto: CreateProductDto): Promise<Product> {
        return await this.productModel.create(createProductDto);
    }

    async updateOne(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
        const product = await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true });
        if (!product) {
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        }
        return product;
    }

    async deleteOne(id: string): Promise<Product> {
        const product = await this.productModel.findByIdAndDelete(id);
        if (!product) {
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        }
        return product;
    }
}
