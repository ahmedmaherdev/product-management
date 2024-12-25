import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { LoginDto } from './dto/login.dto';
import { TokenService } from './token.service';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { UserRole } from './enums/user-role.enum';
import { User, UserDocument } from '../users/user.schema';
import { UsersService } from '../users/users.service';
import { EmailService } from '../common/services/email.service';
import { ResetPasswordDto } from './dto/forget-password.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly tokenService: TokenService,
    private readonly userService: UsersService,
    private readonly emailService: EmailService
  ) {}
  async signup(
    registerDto: RegisterDto
  ): Promise<{ user: User; token: string }> {
    const existingUser = await this.userService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('Please, use another email');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const savedUser = await this.userModel.create({
      name: registerDto.name,
      email: registerDto.email,
      password: hashedPassword,
      role: UserRole.USER,
    });

    this.removeSensitiveFields(savedUser);

    return { token: this.generateUserToken(savedUser), user: savedUser };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userModel
      .findOne({ email: loginDto.email })
      .select('+password');
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (!(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    this.removeSensitiveFields(user);

    return { token: this.generateUserToken(user), user };
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new ConflictException('User with this email does not exist');
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenHash = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Set token and expiration
    user.resetPasswordToken = resetTokenHash;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
    await user.save();

    // Send email
    const resetUrl = `http://localhost:4200/reset-password?token=${resetToken}`;
    console.log(resetUrl);
    await this.emailService.sendEmail({
      to: user.email,
      subject: 'Password Reset Request',
      text: `You requested a password reset. Click the link to reset your password: ${resetUrl}`,
    });

    return { message: 'Password reset email sent successfully' };
  }

  async resetPassword(
    resetPasswordDto: ResetPasswordDto
  ): Promise<{ message: string }> {
    const tokenHash = crypto
      .createHash('sha256')
      .update(resetPasswordDto.token)
      .digest('hex');

    const user = await this.userModel.findOne({
      resetPasswordToken: tokenHash,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    // Update password
    user.password = await bcrypt.hash(resetPasswordDto.password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return { message: 'Password reset successful' };
  }

  private generateUserToken(user: User): string {
    const payload = { sub: user._id, email: user.email, role: user.role };
    return this.tokenService.generateToken(payload);
  }

  private removeSensitiveFields(user: User) {
    user.password = undefined;
  }
}
