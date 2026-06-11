import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../common/prisma/prisma.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
export declare class AuthService {
    private prisma;
    private jwt;
    private config;
    constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService);
    register(dto: RegisterDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: any;
        company: {
            id: string;
            slug: string;
            name: string;
            email: string;
            phone: string | null;
            logo: string | null;
            address: string | null;
            website: string | null;
            taxId: string | null;
            currency: string;
            timezone: string;
            isActive: boolean;
            trialEndsAt: Date | null;
            subscriptionId: string | null;
            plan: import(".prisma/client").$Enums.Plan;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        };
    }>;
    login(dto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: any;
        company: {
            id: string;
            slug: string;
            name: string;
            email: string;
            phone: string | null;
            logo: string | null;
            address: string | null;
            website: string | null;
            taxId: string | null;
            currency: string;
            timezone: string;
            isActive: boolean;
            trialEndsAt: Date | null;
            subscriptionId: string | null;
            plan: import(".prisma/client").$Enums.Plan;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        };
    }>;
    refreshTokens(userId: string, refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(userId: string): Promise<{
        message: string;
    }>;
    getProfile(userId: string): Promise<any>;
    private generateTokens;
    private sanitizeUser;
}
