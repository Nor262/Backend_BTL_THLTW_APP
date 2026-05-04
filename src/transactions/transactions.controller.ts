import { Controller, Post, Body, Param, UseGuards, Request, Put, Get } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto, ReviewTransactionDto, CheckInOutDto, VerifyItemDto } from './transactions.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Transactions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Roles('borrower', 'admin')
  @Post('borrow')
  createBorrowRequest(@Request() req: any, @Body() dto: CreateTransactionDto) {
    return this.transactionsService.createBorrowRequest(req.user.id, dto);
  }

  @Roles('admin')
  @Put(':id/review')
  reviewRequest(@Request() req: any, @Param('id') id: string, @Body() dto: ReviewTransactionDto) {
    return this.transactionsService.reviewRequest(+id, req.user.id, dto);
  }

  @Roles('storekeeper', 'admin')
  @Put(':id/checkout')
  checkOut(@Request() req: any, @Param('id') id: string, @Body() dto: CheckInOutDto) {
    return this.transactionsService.checkOut(+id, req.user.id, dto);
  }

  @Roles('storekeeper', 'admin')
  @Put(':id/checkin')
  checkIn(@Request() req: any, @Param('id') id: string, @Body() dto: CheckInOutDto) {
    return this.transactionsService.checkIn(+id, req.user.id, dto);
  }

  @Roles('storekeeper', 'admin')
  @Post('verify-item')
  verifyItem(@Body() dto: VerifyItemDto) {
    return this.transactionsService.verifyItem(dto.serial_number);
  }

  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }

  @Get('my')
  findMyTransactions(@Request() req: any) {
    return this.transactionsService.findMyTransactions(req.user.id);
  }

  @Get('equipment/:id')
  findByEquipment(@Param('id') id: string) {
    return this.transactionsService.findByEquipment(+id);
  }
}

