import { PrismaService } from '../common/prisma/prisma.service';
export declare class LeadsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(companyId: string, query: any): Promise<{
        data: any;
        total: any;
        page: number;
        limit: number;
        pages: number;
    }>;
    findOne(id: string, companyId: string): Promise<any>;
    create(companyId: string, userId: string, dto: any): Promise<any>;
    update(id: string, companyId: string, userId: string, dto: any): Promise<any>;
    remove(id: string, companyId: string): Promise<any>;
    updateStage(id: string, companyId: string, userId: string, stage: string, lostReason?: string): Promise<any>;
    bulkUpdate(companyId: string, ids: string[], data: any): Promise<{
        updated: number;
    }>;
    bulkDelete(companyId: string, ids: string[]): Promise<{
        deleted: number;
    }>;
    getKanban(companyId: string): Promise<{
        stage: string;
        leads: any;
        count: any;
        totalValue: any;
    }[]>;
    getActivities(leadId: string, companyId: string, page?: number, limit?: number): Promise<{
        data: any;
        total: any;
        page: number;
        limit: number;
    }>;
    addActivity(leadId: string, companyId: string, userId: string, dto: any): Promise<any>;
    getFollowUps(companyId: string, query: any): Promise<{
        data: any;
        total: any;
        page: number;
        limit: number;
    }>;
    createFollowUp(leadId: string, companyId: string, userId: string, dto: any): Promise<any>;
    completeFollowUp(id: string, companyId: string, userId: string, outcome?: string): Promise<any>;
    snoozeFollowUp(id: string, companyId: string, snoozeUntil: Date): Promise<any>;
    matchProperties(leadId: string, companyId: string): Promise<any>;
    private calcMatchScore;
    getStats(companyId: string): Promise<{
        total: any;
        thisMonthNew: any;
        lastMonthNew: any;
        growth: string;
        overdueFollowUps: any;
        hot: any;
        conversionRate: string;
        pipelineValue: any;
        stageStats: any;
        sourceStats: any;
    }>;
    getDashboard(companyId: string): Promise<{
        stats: {
            total: any;
            thisMonthNew: any;
            lastMonthNew: any;
            growth: string;
            overdueFollowUps: any;
            hot: any;
            conversionRate: string;
            pipelineValue: any;
            stageStats: any;
            sourceStats: any;
        };
        recentLeads: any;
        overdueFollowUps: any;
        upcomingFollowUps: any;
    }>;
    assignLead(id: string, companyId: string, actorId: string, assignedToId: string): Promise<any>;
    checkDuplicates(companyId: string, phone: string, email?: string): Promise<{
        duplicates: any;
        hasDuplicates: boolean;
    }>;
}
