import { Transform } from "class-transformer";
import { IsOptional, IsPositive, Max, Min } from "class-validator";

export class PaginationQueryDto {
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    @IsPositive()
    @Min(1)
    @Max(100)
    limit: number = 10;

    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    @IsPositive()
    @Min(1)
    page: number = 1;
}