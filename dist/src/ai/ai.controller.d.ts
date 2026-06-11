import { AiService } from './ai.service';
export declare class AiController {
    private service;
    constructor(service: AiService);
    insights(req: any): Promise<{
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
    forecast(req: any): Promise<{
        forecast: {
            month: string;
            expected: number;
            projected: number;
        }[];
    }>;
    risk(req: any): Promise<{
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
    chat(req: any, body: {
        message: string;
    }): Promise<{
        reply: any;
    }>;
}
