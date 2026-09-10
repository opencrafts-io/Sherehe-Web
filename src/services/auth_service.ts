import { VERISAFE_BASE_URL } from "../config/env";
import type { TokenResponse, TokenResponseDto } from "../models/token_response";
import { verisafeApi, verisafeLoggedInApi } from "./api";

class AuthService {
    loginWithProvider(provider: "google" | "apple") {
        const redirectUri = `${window.location.origin}/auth/callback`;

        const url =
            `${VERISAFE_BASE_URL}/auth/${provider}?platform=mobile&deep_link=${encodeURIComponent(redirectUri)}`;

        window.location.href = url;
    }

    loginWithGoogle() {
        this.loginWithProvider("google");
    }

    loginWithApple() {
        this.loginWithProvider("apple");
    }

    async exchangeCode(code: string): Promise<TokenResponse> {
        const response = await verisafeApi.post<TokenResponseDto>(
            "/auth/token/exchange",
            { code, },
        );

        return {
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
            accessExpiresAt: response.data.access_expires_at,
            refreshExpiresAt: response.data.refresh_expires_at,
        };
    }

    async tokenRefresh(refreshToken: string): Promise<TokenResponse> {
        const response = await verisafeApi.post<TokenResponseDto>(
            "/auth/token/refresh",
            { "refresh_token": refreshToken },
        );

        return {
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
            accessExpiresAt: response.data.access_expires_at,
            refreshExpiresAt: response.data.refresh_expires_at,
        };
    }

    async revokeTokens(refreshToken: string) {
        await verisafeLoggedInApi.post(
            "/auth/token/revoke",
            { "refresh_token": refreshToken },
        );
    }
}

export default new AuthService();