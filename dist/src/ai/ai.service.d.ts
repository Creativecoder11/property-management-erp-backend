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
            totalRevenue: any;
            collected: any;
            expenses: any;
            collectionRate: string;
            overdueInstallments: any;
            netProfit: number;
            totalBookings: any;
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
        risks: any[];
    }>;
    chat(companyId: string, message: string): Promise<{
        reply: any;
    }>;
}
