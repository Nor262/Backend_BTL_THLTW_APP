import { Controller, Get, Patch, Param, Body, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserRoleDto, DeactivateUserDto } from './users.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Users Management')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles('admin')
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Roles('admin')
  @Patch(':id/role')
  updateRole(@Request() req: any, @Param('id') id: string, @Body() dto: UpdateUserRoleDto) {
    return this.usersService.updateRole(+id, dto.role, req.user.id);
  }

  @Roles('admin')
  @Patch(':id/status')
  setActiveStatus(@Request() req: any, @Param('id') id: string, @Body() dto: DeactivateUserDto) {
    return this.usersService.setActiveStatus(+id, dto.is_active, req.user.id);
  }
}
