import { Injectable, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto, RegisterDto, ForgotPasswordDto, ResetPasswordDto } from './auth.dto';
import { UpdateProfileDto, ChangePasswordDto } from '../users/users.dto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService
  ) { }

  async validateUser(identifier: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByIdentifier(identifier);
    if (user && await bcrypt.compare(pass, user.password_hash)) {
      const { password_hash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.identifier, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Wrong Email or Password');
    }
    if (!user.is_active) {
      throw new UnauthorizedException('Account is deactivated. Contact admin.');
    }
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      user,
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async register(registerDto: RegisterDto) {
    const existingEmail = await this.usersService.findOneByEmail(registerDto.email);
    if (existingEmail) {
      throw new BadRequestException('Email already exists');
    }

    const existingUsername = await this.usersService.findOneByUsername(registerDto.username);
    if (existingUsername) {
      throw new BadRequestException('Username already exists');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(registerDto.password, salt);

    const user = await this.usersService.create({
      email: registerDto.email,
      username: registerDto.username,
      full_name: registerDto.full_name,
      phone: registerDto.phone,
      password_hash: hashedPassword,
      role: 'borrower',
    });

    const { password_hash, ...result } = user;
    return result;
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.usersService.findOneByEmail(dto.email);
    if (!user) {
      // For security reasons, don't reveal if user exists.
      // But in this context, it's usually okay or requested.
      throw new NotFoundException('User with this email not found');
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 5); // 5 minutes expiry

    await this.usersService.updateOtp(user.id, otp, expiresAt);
    await this.mailService.sendOtpEmail(user.email, otp);

    return { message: 'OTP has been sent to your email' };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const user = await this.usersService.findOneByEmail(dto.email);
    if (!user || !user.otp || !user.otp_expires_at) {
      throw new BadRequestException('Invalid request');
    }

    if (user.otp !== dto.otp) {
      throw new BadRequestException('Invalid OTP');
    }

    if (new Date() > user.otp_expires_at) {
      throw new BadRequestException('OTP has expired');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(dto.new_password, salt);

    await this.usersService.updatePassword(user.id, hashedPassword);

    return { message: 'Password has been reset successfully' };
  }

  async updateProfile(userId: number, dto: UpdateProfileDto) {
    return this.usersService.updateProfile(userId, dto);
  }

  async changePassword(userId: number, dto: ChangePasswordDto) {
    const user = await this.usersService.findById(userId);
    if (!user) throw new UnauthorizedException('User not found');

    const isMatch = await bcrypt.compare(dto.old_password, user.password_hash);
    if (!isMatch) throw new BadRequestException('Old password is incorrect');

    const salt = await bcrypt.genSalt();
    const newHash = await bcrypt.hash(dto.new_password, salt);
    await this.usersService.updatePassword(userId, newHash);

    return { message: 'Password changed successfully' };
  }
}
