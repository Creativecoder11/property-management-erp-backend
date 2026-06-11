import { LeadsService } from './leads.service';
export declare class LeadsController {
    private service;
    constructor(service: LeadsService);
    findAll(req: any, q: any): Promise<{
        data: any;
        total: any;
        page: number;
        limit: number;
        pages: number;
    }>;
    dashboard(req: any): Promise<{
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
    kanban(req: any): Promise<{
        stage: string;
        leads: any;
        count: any;
        totalValue: any;
    }[]>;
    stats(req: any): Promise<{
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
    checkDuplicates(req: any, phone: string, email?: string): Promise<{
        duplicates: any;
        hasDuplicates: boolean;
    }>;
    getFollowUps(req: any, q: any): Promise<{
        data: any;
        total: any;
        page: number;
        limit: number;
    }>;
    findOne(id: string, req: any): Promise<any>;
    create(req: any, dto: any): Promise<any>;
    update(id: string, req: any, dto: any): Promise<any>;
    remove(id: string, req: any): Promise<any>;
    updateStage(id: string, req: any, body: {
        stage: string;
        lostReason?: string;
    }): Promise<any>;
    bulkUpdate(req: any, body: {
        ids: string[];
        data: any;
    }): Promise<{
        updated: number;
    }>;
    bulkDelete(req: any, body: {
        ids: string[];
    }): Promise<{
        deleted: number;
    }>;
    getActivities(id: string, req: any, q: any): Promise<{
        data: any;
        total: any;
        page: number;
        limit: number;
    }>;
    addActivity(id: string, req: any, dto: any): Promise<any>;
    createFollowUp(id: string, req: any, dto: any): Promise<any>;
    completeFollowUp(id: string, req: any, body: {
        outcome?: string;
    }): Promise<any>;
    snoozeFollowUp(id: string, req: any, body: {
        snoozeUntil: string;
    }): Promise<any>;
    matchProperties(id: string, req: any): Promise<any>;
    assign(id: string, req: any, body: {
        assignedToId: string;
    }): Promise<any>;
}
