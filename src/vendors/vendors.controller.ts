import { Controller, Get, Post, Put, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { VendorsService } from './vendors.service';

@ApiTags('Vendors')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('vendors')
export class VendorsController {
  constructor(private service: VendorsService) {}
  @Get() findAll(@Req() req: any, @Query() q: any) { return this.service.findAll(req.user.companyId, q); }
  @Get('purchase-orders') getPOs(@Req() req: any) { return this.service.getPOs(req.user.companyId); }
  @Get(':id') findOne(@Param('id') id: string, @Req() req: any) { return this.service.findOne(id, req.user.companyId); }
  @Post() create(@Req() req: any, @Body() dto: any) { return this.service.create(req.user.companyId, dto); }
  @Post('purchase-orders') createPO(@Req() req: any, @Body() dto: any) { return this.service.createPO(req.user.companyId, dto); }
  @Put(':id') update(@Param('id') id: string, @Req() req: any, @Body() dto: any) { return this.service.update(id, req.user.companyId, dto); }
}
