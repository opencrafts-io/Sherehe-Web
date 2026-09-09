import type { TokenResponse } from "../models/token_response";

class TokenStorage {
    saveTokens(tokens: TokenResponse) {
        localStorage.setItem(
            "accessToken",
            tokens.accessToken
        );

        localStorage.setItem(
            "refreshToken",
            tokens.refreshToken
        );

        localStorage.setItem(
            "accessExpiresAt",
            tokens.accessExpiresAt
        );

        localStorage.setItem(
            "refreshExpiresAt",
            tokens.refreshExpiresAt
        );
    }

    getAccessToken(): string | null {
        return localStorage.getItem("accessToken");
    }

    getRefreshToken(): string | null {
        return localStorage.getItem("refreshToken");
    }

    clearTokens() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessExpiresAt");
        localStorage.removeItem("refreshExpiresAt");
    }
}

export default new TokenStorage();