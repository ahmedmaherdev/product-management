import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { API_URIS } from '../common/constants/api-uris';
import { User } from '../users/user.schema';

@Controller(API_URIS.AUTH.BASE)
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @Post(API_URIS.AUTH.REGISTER)
    async register(@Body() registerDto: RegisterDto): Promise<{ user: User, token: string }> {
        return this.authService.register(registerDto);
    }

    @Post(API_URIS.AUTH.LOGIN)
    async login(@Body() loginDto: LoginDto): Promise<{ user: User, token: string }> {
        return this.authService.login(loginDto);
    }

    @Post(API_URIS.AUTH.LOGOUT)
    async logout() {
        return this.authService.logout();
    }
}
