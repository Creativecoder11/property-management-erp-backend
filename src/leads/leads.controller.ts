import { Controller, Get, Post, Put, Patch, Delete, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LeadsService } from './leads.service';

@ApiTags('Leads')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('leads')
export class LeadsController {
  constructor(private service: LeadsService) {}

  // ── Leads CRUD ────────────────────────────────────────────────
  @Get()
  findAll(@Req() req: any, @Query() q: any) {
    return this.service.findAll(req.user.companyId, q);
  }

  @Get('dashboard')
  dashboard(@Req() req: any) {
    return this.service.getDashboard(req.user.companyId);
  }

  @Get('kanban')
  kanban(@Req() req: any) {
    return this.service.getKanban(req.user.companyId);
  }

  @Get('stats')
  stats(@Req() req: any) {
    return this.service.getStats(req.user.companyId);
  }

  @Get('check-duplicates')
  checkDuplicates(@Req() req: any, @Query('phone') phone: string, @Query('email') email?: string) {
    return this.service.checkDuplicates(req.user.companyId, phone, email);
  }

  @Get('follow-ups')
  getFollowUps(@Req() req: any, @Query() q: any) {
    return this.service.getFollowUps(req.user.companyId, q);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.service.findOne(id, req.user.companyId);
  }

  @Post()
  create(@Req() req: any, @Body() dto: any) {
    return this.service.create(req.user.companyId, req.user.id, dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Req() req: any, @Body() dto: any) {
    return this.service.update(id, req.user.companyId, req.user.id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.service.remove(id, req.user.companyId);
  }

  // ── Stage ─────────────────────────────────────────────────────
  @Patch(':id/stage')
  updateStage(@Param('id') id: string, @Req() req: any, @Body() body: { stage: string; lostReason?: string }) {
    return this.service.updateStage(id, req.user.companyId, req.user.id, body.stage, body.lostReason);
  }

  // ── Bulk ──────────────────────────────────────────────────────
  @Post('bulk/update')
  bulkUpdate(@Req() req: any, @Body() body: { ids: string[]; data: any }) {
    return this.service.bulkUpdate(req.user.companyId, body.ids, body.data);
  }

  @Post('bulk/delete')
  bulkDelete(@Req() req: any, @Body() body: { ids: string[] }) {
    return this.service.bulkDelete(req.user.companyId, body.ids);
  }

  // ── Activities ────────────────────────────────────────────────
  @Get(':id/activities')
  getActivities(@Param('id') id: string, @Req() req: any, @Query() q: any) {
    return this.service.getActivities(id, req.user.companyId, Number(q.page) || 1, Number(q.limit) || 20);
  }

  @Post(':id/activities')
  addActivity(@Param('id') id: string, @Req() req: any, @Body() dto: any) {
    return this.service.addActivity(id, req.user.companyId, req.user.id, dto);
  }

  // ── Follow-ups ────────────────────────────────────────────────
  @Post(':id/follow-ups')
  createFollowUp(@Param('id') id: string, @Req() req: any, @Body() dto: any) {
    return this.service.createFollowUp(id, req.user.companyId, req.user.id, dto);
  }

  @Patch('follow-ups/:followUpId/complete')
  completeFollowUp(@Param('followUpId') id: string, @Req() req: any, @Body() body: { outcome?: string }) {
    return this.service.completeFollowUp(id, req.user.companyId, req.user.id, body.outcome);
  }

  @Patch('follow-ups/:followUpId/snooze')
  snoozeFollowUp(@Param('followUpId') id: string, @Req() req: any, @Body() body: { snoozeUntil: string }) {
    return this.service.snoozeFollowUp(id, req.user.companyId, new Date(body.snoozeUntil));
  }

  // ── Property Matching ─────────────────────────────────────────
  @Get(':id/property-matches')
  matchProperties(@Param('id') id: string, @Req() req: any) {
    return this.service.matchProperties(id, req.user.companyId);
  }

  // ── Assignment ────────────────────────────────────────────────
  @Patch(':id/assign')
  assign(@Param('id') id: string, @Req() req: any, @Body() body: { assignedToId: string }) {
    return this.service.assignLead(id, req.user.companyId, req.user.id, body.assignedToId);
  }
}
