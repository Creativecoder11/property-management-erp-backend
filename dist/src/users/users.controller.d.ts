import { UsersService } from './users.service';
export declare class UsersController {
    private service;
    constructor(service: UsersService);
    findAll(req: any): Promise<{
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
    findOne(id: string, req: any): Promise<{
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
    create(req: any, dto: any): Promise<{
        id: string;
        email: string;
        isActive: boolean;
        firstName: string;
        lastName: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    update(id: string, req: any, dto: any): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    deactivate(id: string, req: any): Promise<{
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
