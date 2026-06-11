import { PrismaService } from '../common/prisma/prisma.service';
export declare class UnitsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(companyId: string, query: any): Promise<{
        data: ({
            floor: {
                tower: {
                    id: string;
                    name: string;
                    createdAt: Date;
                    updatedAt: Date;
                    totalFloors: number;
                    projectId: string;
                };
            } & {
                id: string;
                name: string | null;
                createdAt: Date;
                updatedAt: Date;
                floorNo: number;
                towerId: string;
            };
        } & {
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
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<{
        bookings: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            companyId: string;
            status: import(".prisma/client").$Enums.BookingStatus;
            projectId: string;
            notes: string | null;
            finalPrice: number;
            bookingNo: string;
            clientId: string;
            unitId: string;
            salePrice: number;
            discount: number;
            bookingDate: Date;
            handoverDate: Date | null;
            agreementUrl: string | null;
            commissionPct: number;
            commissionAmt: number;
        }[];
        floor: {
            tower: {
                project: {
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
                };
            } & {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                totalFloors: number;
                projectId: string;
            };
        } & {
            id: string;
            name: string | null;
            createdAt: Date;
            updatedAt: Date;
            floorNo: number;
            towerId: string;
        };
    } & {
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
    }>;
    create(dto: any): Promise<{
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
    }>;
    update(id: string, dto: any): Promise<{
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
    }>;
    updateStatus(id: string, status: string): Promise<{
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
    }>;
    getAvailabilityMatrix(projectId: string): Promise<({
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
    })[]>;
}
