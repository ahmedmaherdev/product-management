import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) {}

    async findByEmail(email: string) {
        return await this.userModel.findOne({ email });
    }

    async findById(id: string) {
        return await this.userModel.findById(id);
    }
}
