import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TokenService } from './token.service';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { EmailService } from '../common/services/email.service';

@Module({
  providers: [
    AuthService,
    TokenService,
    ConfigService,
    EmailService,
    JwtStrategy,
  ],
  controllers: [AuthController],
  imports: [UsersModule, PassportModule],
})
export class AuthModule {}
