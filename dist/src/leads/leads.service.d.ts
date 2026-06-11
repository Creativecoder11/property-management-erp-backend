import { PrismaService } from '../common/prisma/prisma.service';
export declare class LeadsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(companyId: string, query: any): Promise<{
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
    findOne(id: string, companyId: string): Promise<{
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
    create(companyId: string, userId: string, dto: any): Promise<{
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
    update(id: string, companyId: string, userId: string, dto: any): Promise<{
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
    remove(id: string, companyId: string): Promise<{
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
    updateStage(id: string, companyId: string, userId: string, stage: string, lostReason?: string): Promise<{
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
    bulkUpdate(companyId: string, ids: string[], data: any): Promise<{
        updated: number;
    }>;
    bulkDelete(companyId: string, ids: string[]): Promise<{
        deleted: number;
    }>;
    getKanban(companyId: string): Promise<{
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
    getActivities(leadId: string, companyId: string, page?: number, limit?: number): Promise<{
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
    addActivity(leadId: string, companyId: string, userId: string, dto: any): Promise<{
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
    getFollowUps(companyId: string, query: any): Promise<{
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
    createFollowUp(leadId: string, companyId: string, userId: string, dto: any): Promise<{
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
    completeFollowUp(id: string, companyId: string, userId: string, outcome?: string): Promise<{
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
    snoozeFollowUp(id: string, companyId: string, snoozeUntil: Date): Promise<{
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
    matchProperties(leadId: string, companyId: string): Promise<{
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
    private calcMatchScore;
    getStats(companyId: string): Promise<{
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
    getDashboard(companyId: string): Promise<{
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
    assignLead(id: string, companyId: string, actorId: string, assignedToId: string): Promise<{
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
    checkDuplicates(companyId: string, phone: string, email?: string): Promise<{
        duplicates: {
            id: string;
            name: string;
            email: string | null;
            phone: string;
            stage: import(".prisma/client").$Enums.LeadStage;
        }[];
        hasDuplicates: boolean;
    }>;
}
