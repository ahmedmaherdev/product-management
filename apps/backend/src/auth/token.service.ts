import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TokenService {
    private readonly jwtSecret: string;
    private readonly jwtExpiresIn: string;

    constructor(private configService: ConfigService) {
        this.jwtSecret = this.configService.get('JWT_SECRET');
        this.jwtExpiresIn = this.configService.get('JWT_EXPIRES_IN');
    }

    generateToken(payload: any) {
        return jwt.sign(payload, this.jwtSecret, { expiresIn: this.jwtExpiresIn });
    }

    verifyToken(token: string) {
        return jwt.verify(token, this.jwtSecret);
    }
}