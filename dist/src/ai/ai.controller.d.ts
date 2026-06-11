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
            totalRevenue: any;
            collected: any;
            expenses: any;
            collectionRate: string;
            overdueInstallments: any;
            netProfit: number;
            totalBookings: any;
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
        risks: any[];
    }>;
    chat(req: any, body: {
        message: string;
    }): Promise<{
        reply: any;
    }>;
}
