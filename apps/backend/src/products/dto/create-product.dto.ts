import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsPositive()
    @Transform(({ value }) => parseFloat(value))
    @IsNotEmpty()
    price: number;

    @IsString()
    @IsOptional()
    category: string;

    createdBy?: string;
}