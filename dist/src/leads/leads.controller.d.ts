import { LeadsService } from './leads.service';
export declare class LeadsController {
    private service;
    constructor(service: LeadsService);
    findAll(req: any, q: any): Promise<{
        data: ({
            assignedTo: {
                id: string;
                firstName: string;
                lastName: string;
                avatar: string | null;
            } | null;
            _count: {
                followUps: number;
                activities: number;
            };
        } & {
            id: string;
            name: string;
            email: string | null;
            phone: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            companyId: string;
            budget: number | null;
            bedrooms: number | null;
            source: import(".prisma/client").$Enums.LeadSource;
            stage: import(".prisma/client").$Enums.LeadStage;
            priority: import(".prisma/client").$Enums.LeadPriority;
            score: number;
            interestedIn: string | null;
            budgetMin: number | null;
            budgetMax: number | null;
            locationPref: string | null;
            propertyType: string | null;
            notes: string | null;
            lostReason: string | null;
            tags: string[];
            lastContactAt: Date | null;
            followUpAt: Date | null;
            convertedAt: Date | null;
            assignedToId: string | null;
        })[];
        total: number;
        page: number;
        limit: number;
        pages: number;
    }>;
    dashboard(req: any): Promise<{
        stats: {
            total: number;
            thisMonthNew: number;
            lastMonthNew: number;
            growth: string;
            overdueFollowUps: number;
            hot: number;
            conversionRate: string;
            pipelineValue: any;
            stageStats: (import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.LeadGroupByOutputType, "stage"[]> & {
                _count: number;
                _sum: {
                    budget: number | null;
                };
            })[];
            sourceStats: (import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.LeadGroupByOutputType, "source"[]> & {
                _count: number;
            })[];
        };
        recentLeads: ({
            assignedTo: {
                firstName: string;
                lastName: string;
            } | null;
        } & {
            id: string;
            name: string;
            email: string | null;
            phone: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            companyId: string;
            budget: number | null;
            bedrooms: number | null;
            source: import(".prisma/client").$Enums.LeadSource;
            stage: import(".prisma/client").$Enums.LeadStage;
            priority: import(".prisma/client").$Enums.LeadPriority;
            score: number;
            interestedIn: string | null;
            budgetMin: number | null;
            budgetMax: number | null;
            locationPref: string | null;
            propertyType: string | null;
            notes: string | null;
            lostReason: string | null;
            tags: string[];
            lastContactAt: Date | null;
            followUpAt: Date | null;
            convertedAt: Date | null;
            assignedToId: string | null;
        })[];
        overdueFollowUps: ({
            lead: {
                id: string;
                name: string;
                phone: string;
                stage: import(".prisma/client").$Enums.LeadStage;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            type: import(".prisma/client").$Enums.ActivityType;
            status: import(".prisma/client").$Enums.FollowUpStatus;
            leadId: string;
            outcome: string | null;
            userId: string;
            title: string;
            dueAt: Date;
            completedAt: Date | null;
        })[];
        upcomingFollowUps: ({
            lead: {
                id: string;
                name: string;
                phone: string;
                stage: import(".prisma/client").$Enums.LeadStage;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            type: import(".prisma/client").$Enums.ActivityType;
            status: import(".prisma/client").$Enums.FollowUpStatus;
            leadId: string;
            outcome: string | null;
            userId: string;
            title: string;
            dueAt: Date;
            completedAt: Date | null;
        })[];
    }>;
    kanban(req: any): Promise<{
        stage: string;
        leads: ({
            assignedTo: {
                id: string;
                firstName: string;
                lastName: string;
                avatar: string | null;
            } | null;
            _count: {
                followUps: number;
                activities: number;
            };
        } & {
            id: string;
            name: string;
            email: string | null;
            phone: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            companyId: string;
            budget: number | null;
            bedrooms: number | null;
            source: import(".prisma/client").$Enums.LeadSource;
            stage: import(".prisma/client").$Enums.LeadStage;
            priority: import(".prisma/client").$Enums.LeadPriority;
            score: number;
            interestedIn: string | null;
            budgetMin: number | null;
            budgetMax: number | null;
            locationPref: string | null;
            propertyType: string | null;
            notes: string | null;
            lostReason: string | null;
            tags: string[];
            lastContactAt: Date | null;
            followUpAt: Date | null;
            convertedAt: Date | null;
            assignedToId: string | null;
        })[];
        count: number;
        totalValue: number;
    }[]>;
    stats(req: any): Promise<{
        total: number;
        thisMonthNew: number;
        lastMonthNew: number;
        growth: string;
        overdueFollowUps: number;
        hot: number;
        conversionRate: string;
        pipelineValue: any;
        stageStats: (import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.LeadGroupByOutputType, "stage"[]> & {
            _count: number;
            _sum: {
                budget: number | null;
            };
        })[];
        sourceStats: (import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.LeadGroupByOutputType, "source"[]> & {
            _count: number;
        })[];
    }>;
    checkDuplicates(req: any, phone: string, email?: string): Promise<{
        duplicates: {
            id: string;
            name: string;
            email: string | null;
            phone: string;
            stage: import(".prisma/client").$Enums.LeadStage;
        }[];
        hasDuplicates: boolean;
    }>;
    getFollowUps(req: any, q: any): Promise<{
        data: ({
            user: {
                firstName: string;
                lastName: string;
            };
            lead: {
                id: string;
                name: string;
                phone: string;
                stage: import(".prisma/client").$Enums.LeadStage;
                priority: import(".prisma/client").$Enums.LeadPriority;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            type: import(".prisma/client").$Enums.ActivityType;
            status: import(".prisma/client").$Enums.FollowUpStatus;
            leadId: string;
            outcome: string | null;
            userId: string;
            title: string;
            dueAt: Date;
            completedAt: Date | null;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string, req: any): Promise<{
        followUps: ({
            user: {
                firstName: string;
                lastName: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            type: import(".prisma/client").$Enums.ActivityType;
            status: import(".prisma/client").$Enums.FollowUpStatus;
            leadId: string;
            outcome: string | null;
            userId: string;
            title: string;
            dueAt: Date;
            completedAt: Date | null;
        })[];
        client: {
            id: string;
            name: string;
        } | null;
        assignedTo: {
            id: string;
            firstName: string;
            lastName: string;
            avatar: string | null;
            role: import(".prisma/client").$Enums.Role;
        } | null;
        activities: ({
            user: {
                firstName: string;
                lastName: string;
                avatar: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            type: import(".prisma/client").$Enums.ActivityType;
            leadId: string;
            notes: string | null;
            outcome: string | null;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            scheduledAt: Date | null;
            userId: string;
        })[];
    } & {
        id: string;
        name: string;
        email: string | null;
        phone: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        companyId: string;
        budget: number | null;
        bedrooms: number | null;
        source: import(".prisma/client").$Enums.LeadSource;
        stage: import(".prisma/client").$Enums.LeadStage;
        priority: import(".prisma/client").$Enums.LeadPriority;
        score: number;
        interestedIn: string | null;
        budgetMin: number | null;
        budgetMax: number | null;
        locationPref: string | null;
        propertyType: string | null;
        notes: string | null;
        lostReason: string | null;
        tags: string[];
        lastContactAt: Date | null;
        followUpAt: Date | null;
        convertedAt: Date | null;
        assignedToId: string | null;
    }>;
    create(req: any, dto: any): Promise<{
        id: string;
        name: string;
        email: string | null;
        phone: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        companyId: string;
        budget: number | null;
        bedrooms: number | null;
        source: import(".prisma/client").$Enums.LeadSource;
        stage: import(".prisma/client").$Enums.LeadStage;
        priority: import(".prisma/client").$Enums.LeadPriority;
        score: number;
        interestedIn: string | null;
        budgetMin: number | null;
        budgetMax: number | null;
        locationPref: string | null;
        propertyType: string | null;
        notes: string | null;
        lostReason: string | null;
        tags: string[];
        lastContactAt: Date | null;
        followUpAt: Date | null;
        convertedAt: Date | null;
        assignedToId: string | null;
    }>;
    update(id: string, req: any, dto: any): Promise<{
        id: string;
        name: string;
        email: string | null;
        phone: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        companyId: string;
        budget: number | null;
        bedrooms: number | null;
        source: import(".prisma/client").$Enums.LeadSource;
        stage: import(".prisma/client").$Enums.LeadStage;
        priority: import(".prisma/client").$Enums.LeadPriority;
        score: number;
        interestedIn: string | null;
        budgetMin: number | null;
        budgetMax: number | null;
        locationPref: string | null;
        propertyType: string | null;
        notes: string | null;
        lostReason: string | null;
        tags: string[];
        lastContactAt: Date | null;
        followUpAt: Date | null;
        convertedAt: Date | null;
        assignedToId: string | null;
    }>;
    remove(id: string, req: any): Promise<{
        id: string;
        name: string;
        email: string | null;
        phone: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        companyId: string;
        budget: number | null;
        bedrooms: number | null;
        source: import(".prisma/client").$Enums.LeadSource;
        stage: import(".prisma/client").$Enums.LeadStage;
        priority: import(".prisma/client").$Enums.LeadPriority;
        score: number;
        interestedIn: string | null;
        budgetMin: number | null;
        budgetMax: number | null;
        locationPref: string | null;
        propertyType: string | null;
        notes: string | null;
        lostReason: string | null;
        tags: string[];
        lastContactAt: Date | null;
        followUpAt: Date | null;
        convertedAt: Date | null;
        assignedToId: string | null;
    }>;
    updateStage(id: string, req: any, body: {
        stage: string;
        lostReason?: string;
    }): Promise<{
        id: string;
        name: string;
        email: string | null;
        phone: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        companyId: string;
        budget: number | null;
        bedrooms: number | null;
        source: import(".prisma/client").$Enums.LeadSource;
        stage: import(".prisma/client").$Enums.LeadStage;
        priority: import(".prisma/client").$Enums.LeadPriority;
        score: number;
        interestedIn: string | null;
        budgetMin: number | null;
        budgetMax: number | null;
        locationPref: string | null;
        propertyType: string | null;
        notes: string | null;
        lostReason: string | null;
        tags: string[];
        lastContactAt: Date | null;
        followUpAt: Date | null;
        convertedAt: Date | null;
        assignedToId: string | null;
    }>;
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
        data: ({
            user: {
                firstName: string;
                lastName: string;
                avatar: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            type: import(".prisma/client").$Enums.ActivityType;
            leadId: string;
            notes: string | null;
            outcome: string | null;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            scheduledAt: Date | null;
            userId: string;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    addActivity(id: string, req: any, dto: any): Promise<{
        user: {
            firstName: string;
            lastName: string;
            avatar: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        type: import(".prisma/client").$Enums.ActivityType;
        leadId: string;
        notes: string | null;
        outcome: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        scheduledAt: Date | null;
        userId: string;
    }>;
    createFollowUp(id: string, req: any, dto: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        type: import(".prisma/client").$Enums.ActivityType;
        status: import(".prisma/client").$Enums.FollowUpStatus;
        leadId: string;
        outcome: string | null;
        userId: string;
        title: string;
        dueAt: Date;
        completedAt: Date | null;
    }>;
    completeFollowUp(id: string, req: any, body: {
        outcome?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        type: import(".prisma/client").$Enums.ActivityType;
        status: import(".prisma/client").$Enums.FollowUpStatus;
        leadId: string;
        outcome: string | null;
        userId: string;
        title: string;
        dueAt: Date;
        completedAt: Date | null;
    }>;
    snoozeFollowUp(id: string, req: any, body: {
        snoozeUntil: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        type: import(".prisma/client").$Enums.ActivityType;
        status: import(".prisma/client").$Enums.FollowUpStatus;
        leadId: string;
        outcome: string | null;
        userId: string;
        title: string;
        dueAt: Date;
        completedAt: Date | null;
    }>;
    matchProperties(id: string, req: any): Promise<{
        unitId: string;
        unitNo: string;
        type: import(".prisma/client").$Enums.UnitType;
        bedrooms: number;
        sizeSqft: number;
        price: number;
        floor: number;
        project: {
            id: string;
            name: string;
            location: string | null;
        };
        matchScore: number;
    }[]>;
    assign(id: string, req: any, body: {
        assignedToId: string;
    }): Promise<{
        id: string;
        name: string;
        email: string | null;
        phone: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        companyId: string;
        budget: number | null;
        bedrooms: number | null;
        source: import(".prisma/client").$Enums.LeadSource;
        stage: import(".prisma/client").$Enums.LeadStage;
        priority: import(".prisma/client").$Enums.LeadPriority;
        score: number;
        interestedIn: string | null;
        budgetMin: number | null;
        budgetMax: number | null;
        locationPref: string | null;
        propertyType: string | null;
        notes: string | null;
        lostReason: string | null;
        tags: string[];
        lastContactAt: Date | null;
        followUpAt: Date | null;
        convertedAt: Date | null;
        assignedToId: string | null;
    }>;
}
