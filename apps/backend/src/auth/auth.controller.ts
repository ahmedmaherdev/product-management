import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { API_URIS } from '../common/constants/api-uris';
import { User } from '../users/user.schema';
import { ResetPasswordDto, ForgotPasswordDto } from './dto/forget-password.dto';

@Controller(API_URIS.AUTH.BASE)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post(API_URIS.AUTH.SIGNUP)
  async register(
    @Body() registerDto: RegisterDto
  ): Promise<{ user: User; token: string }> {
    return this.authService.signup(registerDto);
  }

  @Post(API_URIS.AUTH.LOGIN)
  async login(
    @Body() loginDto: LoginDto
  ): Promise<{ user: User; token: string }> {
    return this.authService.login(loginDto);
  }

  @Post(API_URIS.AUTH.FORGOT_PASSWORD)
  async forgotPassword(
    @Body() forgetPasswordDto: ForgotPasswordDto
  ): Promise<{ message: string }> {
    return this.authService.forgotPassword(forgetPasswordDto.email);
  }

  @Post(API_URIS.AUTH.RESET_PASSWORD)
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto
  ): Promise<{ message: string }> {
    return this.authService.resetPassword(resetPasswordDto);
  }
}
