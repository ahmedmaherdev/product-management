import { Transform } from "class-transformer";
import { IsOptional, IsPositive, IsString, Min } from "class-validator";

export class UpdateProductDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsPositive()
    @Transform(({ value }) => parseFloat(value))
    @IsOptional()
    price: number;

    @IsString()
    @IsOptional()
    category: string;

    createdBy?: string;
}