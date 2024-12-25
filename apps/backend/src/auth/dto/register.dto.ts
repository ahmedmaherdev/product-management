import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { UserRole } from '../enums/user-role.enum';
import { Optional } from '@nestjs/common';

export class RegisterDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @MinLength(8)
  @IsNotEmpty()
  confirmPassword: string;
}
