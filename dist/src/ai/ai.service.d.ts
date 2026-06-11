import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../common/prisma/prisma.service';
export declare class AiService {
    private prisma;
    private config;
    constructor(prisma: PrismaService, config: ConfigService);
    getInsights(companyId: string): Promise<{
        insights: {
            type: string;
            title: string;
            message: string;
            impact: string;
        }[];
        metrics: {
            totalRevenue: number;
            collected: number;
            expenses: number;
            collectionRate: string;
            overdueInstallments: number;
            netProfit: number;
            totalBookings: number;
        };
    }>;
    getForecast(companyId: string): Promise<{
        forecast: {
            month: string;
            expected: number;
            projected: number;
        }[];
    }>;
    getRiskAnalysis(companyId: string): Promise<{
        risks: {
            projectId: string;
            projectName: string;
            progressPct: number;
            budgetUsagePct: number;
            isDelayed: boolean | null;
            riskLevel: string;
            message: string;
        }[];
    }>;
    chat(companyId: string, message: string): Promise<{
        reply: any;
    }>;
}
