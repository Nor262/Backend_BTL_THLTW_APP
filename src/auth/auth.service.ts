import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto, RegisterDto } from './auth.dto';
import { UpdateProfileDto, ChangePasswordDto } from '../users/users.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && await bcrypt.compare(pass, user.password_hash)) {
      const { password_hash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
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
      password_hash: hashedPassword,
      role: 'borrower',
    });

    const { password_hash, ...result } = user;
    return result;
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
