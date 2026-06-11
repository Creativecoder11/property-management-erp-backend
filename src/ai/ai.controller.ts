import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AiService } from './ai.service';

@ApiTags('AI')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('ai')
export class AiController {
  constructor(private service: AiService) {}
  @Get('insights') insights(@Req() req: any) { return this.service.getInsights(req.user.companyId); }
  @Get('forecast') forecast(@Req() req: any) { return this.service.getForecast(req.user.companyId); }
  @Get('risk-analysis') risk(@Req() req: any) { return this.service.getRiskAnalysis(req.user.companyId); }
  @Post('chat') chat(@Req() req: any, @Body() body: { message: string }) { return this.service.chat(req.user.companyId, body.message); }
}
