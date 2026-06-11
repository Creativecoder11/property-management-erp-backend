import { Controller, Get, Put, Param, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { NotificationsService } from './notifications.service';

@ApiTags('Notifications')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('notifications')
export class NotificationsController {
  constructor(private service: NotificationsService) {}
  @Get() findAll(@Req() req: any, @Query() q: any) { return this.service.findAll(req.user.companyId, req.user.id, q); }
  @Put(':id/read') markRead(@Param('id') id: string, @Req() req: any) { return this.service.markRead(id, req.user.id); }
  @Put('read-all') markAllRead(@Req() req: any) { return this.service.markAllRead(req.user.companyId, req.user.id); }
}
