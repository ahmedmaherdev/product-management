import { IsEmail, IsEnum, IsNotEmpty, MinLength } from "class-validator";
import { UserRole } from "../enums/user-role.enum";

export class RegisterDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @MinLength(8)
    @IsNotEmpty()
    password: string;

    @IsEnum(UserRole)
    role: string;
}