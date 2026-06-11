import { Controller, Get, Post, Body, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AccountsService } from './accounts.service';

@ApiTags('Accounts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('accounts')
export class AccountsController {
  constructor(private service: AccountsService) {}
  @Get() findAll(@Req() req: any) { return this.service.findAll(req.user.companyId); }
  @Get('summary') summary(@Req() req: any) { return this.service.getFinancialSummary(req.user.companyId); }
  @Get('journals') journals(@Req() req: any, @Query() q: any) { return this.service.getJournals(req.user.companyId, q); }
  @Post() create(@Req() req: any, @Body() dto: any) { return this.service.create(req.user.companyId, dto); }
  @Post('journals') createJournal(@Req() req: any, @Body() dto: any) { return this.service.createJournalEntry(req.user.companyId, dto); }
}
