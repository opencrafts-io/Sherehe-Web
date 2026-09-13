import type { TokenResponse } from "../models/tokenResponse";
import type { User } from "../models/user";

class AppLocalStorage {
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

    private readonly USER_KEY = "user";

    saveUser(user: User): void {
        localStorage.setItem(
            this.USER_KEY,
            JSON.stringify(user)
        );
    }

    saveIsAuthenticated(isAuthenticated: boolean): void {
        localStorage.setItem("isAuthenticated", isAuthenticated.toString());
    }

    getIsAuthenticated(): boolean | null {
        const isAuthenticated = localStorage.getItem("isAuthenticated");
        if (!isAuthenticated) return null;
        return isAuthenticated === "true";
    }

    clearIsAuthenticated(): void {
        localStorage.removeItem("isAuthenticated");
    }
}

export default new AppLocalStorage();