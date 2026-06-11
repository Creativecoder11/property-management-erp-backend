import { Controller, Get, Post, Body, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PaymentsService } from './payments.service';

@ApiTags('Payments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('payments')
export class PaymentsController {
  constructor(private service: PaymentsService) {}
  @Get() findAll(@Req() req: any, @Query() q: any) { return this.service.findAll(req.user.companyId, q); }
  @Get('monthly') monthly(@Req() req: any) { return this.service.getMonthlyCollection(req.user.companyId); }
  @Post() create(@Req() req: any, @Body() dto: any) { return this.service.create(req.user.companyId, dto); }
}
