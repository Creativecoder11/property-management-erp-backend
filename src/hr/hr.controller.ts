import { Controller, Get, Post, Put, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { HrService } from './hr.service';

@ApiTags('HR')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('hr')
export class HrController {
  constructor(private service: HrService) {}
  @Get('stats') stats(@Req() req: any) { return this.service.getHrStats(req.user.companyId); }
  @Get('leaves') leaves(@Req() req: any, @Query() q: any) { return this.service.getLeaveRequests(req.user.companyId, q); }
  @Post('leaves') createLeave(@Req() req: any, @Body() dto: any) { return this.service.createLeaveRequest(req.user.companyId, dto); }
  @Put('leaves/:id') updateLeave(@Param('id') id: string, @Body() dto: any) { return this.service.updateLeaveStatus(id, dto); }
}
