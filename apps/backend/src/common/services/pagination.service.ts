import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { PaginationQueryDto } from '../dto/pagination-query.dto';

@Injectable()
export class PaginationService {

    async paginate<T>(model: Model<T>, paginationQueryDto: PaginationQueryDto): Promise<{ data: T[], count: number, limit: number, page: number }> {
        const { limit, page } = paginationQueryDto;
        const skip = (page - 1) * limit;
        const [data, count] = await Promise.all([
            model.find().limit(limit).skip(skip),
            model.countDocuments()
        ]);
        return { data, count, limit, page };
    }
}
