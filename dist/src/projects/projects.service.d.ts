import { PrismaService } from '../common/prisma/prisma.service';
export declare class ProjectsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(companyId: string, query: any): Promise<{
        data: ({
            _count: {
                towers: number;
                bookings: number;
            };
        } & {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            companyId: string;
            code: string;
            description: string | null;
            type: import(".prisma/client").$Enums.ProjectType;
            status: import(".prisma/client").$Enums.ProjectStatus;
            landArea: number | null;
            totalUnits: number;
            startDate: Date | null;
            expectedEnd: Date | null;
            actualEnd: Date | null;
            budget: number;
            location: string | null;
            latitude: number | null;
            longitude: number | null;
            coverImage: string | null;
            progressPct: number;
        })[];
        total: number;
        page: number;
        limit: number;
        pages: number;
    }>;
    findOne(id: string, companyId: string): Promise<{
        towers: ({
            floors: ({
                units: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    type: import(".prisma/client").$Enums.UnitType;
                    status: import(".prisma/client").$Enums.UnitStatus;
                    unitNo: string;
                    sizeSqft: number;
                    bedrooms: number;
                    bathrooms: number;
                    facing: string | null;
                    basePrice: number;
                    currentPrice: number;
                    floorPlanImage: string | null;
                    hasParking: boolean;
                    parkingNo: string | null;
                    floorId: string;
                }[];
            } & {
                id: string;
                name: string | null;
                createdAt: Date;
                updatedAt: Date;
                floorNo: number;
                towerId: string;
            })[];
        } & {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            totalFloors: number;
            projectId: string;
        })[];
        _count: {
            documents: number;
            progressReports: number;
            bookings: number;
        };
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        companyId: string;
        code: string;
        description: string | null;
        type: import(".prisma/client").$Enums.ProjectType;
        status: import(".prisma/client").$Enums.ProjectStatus;
        landArea: number | null;
        totalUnits: number;
        startDate: Date | null;
        expectedEnd: Date | null;
        actualEnd: Date | null;
        budget: number;
        location: string | null;
        latitude: number | null;
        longitude: number | null;
        coverImage: string | null;
        progressPct: number;
    }>;
    create(companyId: string, dto: any): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        companyId: string;
        code: string;
        description: string | null;
        type: import(".prisma/client").$Enums.ProjectType;
        status: import(".prisma/client").$Enums.ProjectStatus;
        landArea: number | null;
        totalUnits: number;
        startDate: Date | null;
        expectedEnd: Date | null;
        actualEnd: Date | null;
        budget: number;
        location: string | null;
        latitude: number | null;
        longitude: number | null;
        coverImage: string | null;
        progressPct: number;
    }>;
    update(id: string, companyId: string, dto: any): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        companyId: string;
        code: string;
        description: string | null;
        type: import(".prisma/client").$Enums.ProjectType;
        status: import(".prisma/client").$Enums.ProjectStatus;
        landArea: number | null;
        totalUnits: number;
        startDate: Date | null;
        expectedEnd: Date | null;
        actualEnd: Date | null;
        budget: number;
        location: string | null;
        latitude: number | null;
        longitude: number | null;
        coverImage: string | null;
        progressPct: number;
    }>;
    remove(id: string, companyId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        companyId: string;
        code: string;
        description: string | null;
        type: import(".prisma/client").$Enums.ProjectType;
        status: import(".prisma/client").$Enums.ProjectStatus;
        landArea: number | null;
        totalUnits: number;
        startDate: Date | null;
        expectedEnd: Date | null;
        actualEnd: Date | null;
        budget: number;
        location: string | null;
        latitude: number | null;
        longitude: number | null;
        coverImage: string | null;
        progressPct: number;
    }>;
    getStats(companyId: string): Promise<{
        total: number;
        byStatus: (import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.ProjectGroupByOutputType, "status"[]> & {
            _count: number;
        })[];
        totalUnits: number;
        availableUnits: number;
        soldUnits: number;
    }>;
}
