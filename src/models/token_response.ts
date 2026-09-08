export interface TokenResponse {
    accessToken: string;
    refreshToken: string;
    accessExpiresAt: string;
    refreshExpiresAt: string;
}

export interface TokenResponseDto {
    access_token: string;
    refresh_token: string;
    access_expires_at: string;
    refresh_expires_at: string;
}