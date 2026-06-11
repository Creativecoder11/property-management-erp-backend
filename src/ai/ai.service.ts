import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class AiService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}

  async getInsights(companyId: string) {
    const [bookingStats, leadStats, paymentStats, expenseStats, overdueInstallments] = await Promise.all([
      this.prisma.booking.aggregate({ where: { companyId, status: 'ACTIVE' }, _sum: { finalPrice: true }, _count: true }),
      this.prisma.lead.groupBy({ by: ['stage'], where: { companyId, deletedAt: null }, _count: true }),
      this.prisma.payment.aggregate({ where: { booking: { companyId } }, _sum: { amount: true } }),
      this.prisma.expense.aggregate({ where: { companyId, status: 'PAID' }, _sum: { amount: true } }),
      this.prisma.installment.count({ where: { status: 'OVERDUE', booking: { companyId } } }),
    ]);

    const totalRevenue = bookingStats._sum.finalPrice || 0;
    const collected = paymentStats._sum.amount || 0;
    const expenses = expenseStats._sum.amount || 0;
    const collectionRate = totalRevenue > 0 ? ((collected / totalRevenue) * 100).toFixed(1) : '0';

    const insights: Array<{ type: string; title: string; message: string; impact: string }> = [];

    if (overdueInstallments > 0) {
      insights.push({
        type: 'warning',
        title: 'Overdue Installments Alert',
        message: `${overdueInstallments} installment(s) are overdue. Immediate follow-up recommended to improve cash flow.`,
        impact: 'high',
      });
    }

    const lostLeads = leadStats.find((s: any) => s.stage === 'LOST')?._count || 0;
    const totalLeads = leadStats.reduce((s: any, l: any) => s + l._count, 0);
    if (totalLeads > 0 && (lostLeads / totalLeads) > 0.3) {
      insights.push({
        type: 'warning',
        title: 'High Lead Loss Rate',
        message: `${((lostLeads / totalLeads) * 100).toFixed(0)}% of leads are marked as lost. Consider reviewing your sales process and follow-up strategy.`,
        impact: 'medium',
      });
    }

    if (Number(collectionRate) < 70) {
      insights.push({
        type: 'alert',
        title: 'Low Collection Rate',
        message: `Collection rate is ${collectionRate}%. Revenue of ৳${(totalRevenue - collected).toLocaleString()} is yet to be collected.`,
        impact: 'high',
      });
    }

    insights.push({
      type: 'info',
      title: 'Financial Summary',
      message: `Total bookings worth ৳${totalRevenue.toLocaleString()} with ৳${collected.toLocaleString()} collected (${collectionRate}% rate). Net position: ৳${(collected - expenses).toLocaleString()}.`,
      impact: 'low',
    });

    return {
      insights,
      metrics: {
        totalRevenue, collected, expenses, collectionRate, overdueInstallments,
        netProfit: collected - expenses,
        totalBookings: bookingStats._count,
      },
    };
  }

  async getForecast(companyId: string) {
    const months: Array<{ month: string; expected: number; projected: number }> = [];
    for (let i = 0; i < 6; i++) {
      const d = new Date();
      d.setMonth(d.getMonth() + i);
      const start = new Date(d.getFullYear(), d.getMonth(), 1);
      const end = new Date(d.getFullYear(), d.getMonth() + 1, 0);
      const scheduled = await this.prisma.installment.aggregate({
        where: { booking: { companyId }, dueDate: { gte: start, lte: end }, status: { in: ['PENDING', 'PARTIAL'] } },
        _sum: { amount: true },
      });
      months.push({
        month: start.toLocaleString('default', { month: 'short', year: '2-digit' }),
        expected: scheduled._sum.amount || 0,
        projected: (scheduled._sum.amount || 0) * 0.85,
      });
    }
    return { forecast: months };
  }

  async getRiskAnalysis(companyId: string) {
    const projects = await this.prisma.project.findMany({
      where: { companyId, status: 'UNDER_CONSTRUCTION', deletedAt: null },
      select: { id: true, name: true, progressPct: true, expectedEnd: true, budget: true },
    });

    const risks = await Promise.all(
      projects.map(async (p) => {
        const spent = await this.prisma.expense.aggregate({ where: { projectId: p.id }, _sum: { amount: true } });
        const spentAmt = spent._sum.amount || 0;
        const budgetUsagePct = p.budget > 0 ? (spentAmt / p.budget) * 100 : 0;
        const isDelayed = p.expectedEnd && new Date() > p.expectedEnd && p.progressPct < 100;
        const riskLevel = budgetUsagePct > 90 ? 'high' : budgetUsagePct > 75 ? 'medium' : 'low';

        return {
          projectId: p.id,
          projectName: p.name,
          progressPct: p.progressPct,
          budgetUsagePct: Math.round(budgetUsagePct),
          isDelayed,
          riskLevel,
          message: isDelayed
            ? `${p.name} is behind schedule. ${100 - p.progressPct}% work remaining.`
            : budgetUsagePct > 90
            ? `${p.name} may exceed budget. ${budgetUsagePct.toFixed(0)}% of budget used.`
            : `${p.name} is on track.`,
        };
      }),
    );

    return { risks };
  }

  async chat(companyId: string, message: string) {
    const apiKey = this.config.get('OPENAI_API_KEY');

    if (!apiKey) {
      return {
        reply: `I'm your BuildEstate AI assistant. I can help you analyze your real estate ERP data. To enable full AI capabilities, please configure your OpenAI API key. Currently, I can share that you're using BuildEstate ERP - the enterprise real estate management platform.`,
      };
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { default: OpenAI } = require('openai');
      const openai = new OpenAI({ apiKey });
      const summary = await this.getInsights(companyId);

      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a smart AI assistant for BuildEstate ERP, a real estate management platform. You help users understand their business data and make decisions. Current business context: ${JSON.stringify(summary.metrics)}. Be concise, professional, and data-driven.`,
          },
          { role: 'user', content: message },
        ],
        max_tokens: 500,
      });

      return { reply: response.choices[0].message.content };
    } catch {
      return { reply: 'AI service temporarily unavailable. Please try again later.' };
    }
  }
}
