import { PrismaService } from '../common/prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(companyId: string): Promise<{
        id: string;
        email: string;
        phone: string | null;
        isActive: boolean;
        createdAt: Date;
        firstName: string;
        lastName: string;
        avatar: string | null;
        role: import(".prisma/client").$Enums.Role;
        lastLoginAt: Date | null;
    }[]>;
    findOne(id: string, companyId: string): Promise<{
        id: string;
        email: string;
        phone: string | null;
        isActive: boolean;
        createdAt: Date;
        firstName: string;
        lastName: string;
        avatar: string | null;
        role: import(".prisma/client").$Enums.Role;
        lastLoginAt: Date | null;
    }>;
    create(companyId: string, dto: any): Promise<{
        id: string;
        email: string;
        isActive: boolean;
        firstName: string;
        lastName: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    update(id: string, companyId: string, dto: any): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    deactivate(id: string, companyId: string): Promise<{
        id: string;
        email: string;
        phone: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        companyId: string;
        password: string;
        firstName: string;
        lastName: string;
        avatar: string | null;
        role: import(".prisma/client").$Enums.Role;
        isVerified: boolean;
        twoFactorSecret: string | null;
        twoFactorEnabled: boolean;
        lastLoginAt: Date | null;
        refreshToken: string | null;
    }>;
}
