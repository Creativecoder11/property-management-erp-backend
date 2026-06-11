import { Controller, Get, Post, Put, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ConstructionService } from './construction.service';

@ApiTags('Construction')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('construction')
export class ConstructionController {
  constructor(private service: ConstructionService) {}
  @Get('progress/:projectId') progress(@Param('projectId') id: string, @Query() q: any) { return this.service.getProgressReports(id, q); }
  @Post('progress') createProgress(@Req() req: any, @Body() dto: any) { return this.service.createProgressReport({ ...dto, userId: req.user.id }); }
  @Get('work-orders') workOrders(@Req() req: any, @Query() q: any) { return this.service.getWorkOrders(req.user.companyId, q); }
  @Post('work-orders') createWorkOrder(@Body() dto: any) { return this.service.createWorkOrder(dto); }
  @Put('work-orders/:id') updateWorkOrder(@Param('id') id: string, @Body() dto: any) { return this.service.updateWorkOrder(id, dto); }
}
