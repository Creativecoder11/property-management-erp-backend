import { Controller, Get, Put, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CompaniesService } from './companies.service';

@ApiTags('Company')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('company')
export class CompaniesController {
  constructor(private service: CompaniesService) {}
  @Get() findOne(@Req() req: any) { return this.service.findOne(req.user.companyId); }
  @Get('dashboard') dashboard(@Req() req: any) { return this.service.getDashboardStats(req.user.companyId); }
  @Put() update(@Req() req: any, @Body() dto: any) { return this.service.update(req.user.companyId, dto); }
}
