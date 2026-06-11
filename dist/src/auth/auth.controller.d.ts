import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, RefreshTokenDto } from './dto/auth.dto';
export declare class AuthController {
    private auth;
    constructor(auth: AuthService);
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
    refresh(dto: RefreshTokenDto, req: any): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(req: any): Promise<{
        message: string;
    }>;
    profile(req: any): Promise<any>;
}
