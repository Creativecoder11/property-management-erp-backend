export declare class RegisterDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    companyName: string;
    phone?: string;
}
export declare class LoginDto {
    email: string;
    password: string;
}
export declare class ForgotPasswordDto {
    email: string;
}
export declare class ResetPasswordDto {
    token: string;
    password: string;
}
export declare class VerifyOtpDto {
    email: string;
    code: string;
}
export declare class RefreshTokenDto {
    refreshToken: string;
}
