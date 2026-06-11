import { ProjectsService } from './projects.service';
export declare class ProjectsController {
    private service;
    constructor(service: ProjectsService);
    findAll(req: any, q: any): Promise<{
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
    stats(req: any): Promise<{
        total: number;
        byStatus: (import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.ProjectGroupByOutputType, "status"[]> & {
            _count: number;
        })[];
        totalUnits: number;
        availableUnits: number;
        soldUnits: number;
    }>;
    findOne(id: string, req: any): Promise<{
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
    create(req: any, dto: any): Promise<{
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
    update(id: string, req: any, dto: any): Promise<{
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
    remove(id: string, req: any): Promise<{
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
}
