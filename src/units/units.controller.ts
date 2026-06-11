import { Controller, Get, Post, Put, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UnitsService } from './units.service';

@ApiTags('Units')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('units')
export class UnitsController {
  constructor(private service: UnitsService) {}

  @Get() findAll(@Req() req: any, @Query() q: any) { return this.service.findAll(req.user.companyId, q); }
  @Get('matrix/:projectId') matrix(@Param('projectId') id: string) { return this.service.getAvailabilityMatrix(id); }
  @Get(':id') findOne(@Param('id') id: string) { return this.service.findOne(id); }
  @Post() create(@Body() dto: any) { return this.service.create(dto); }
  @Put(':id') update(@Param('id') id: string, @Body() dto: any) { return this.service.update(id, dto); }
  @Put(':id/status') updateStatus(@Param('id') id: string, @Body() body: any) { return this.service.updateStatus(id, body.status); }
}
