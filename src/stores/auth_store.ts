import { create } from "zustand";
import authService from "../services/auth_service";
import tokenStorage from "../utils/token_storage";
import userStorage from "../utils/user_storage";

interface AuthState {
    loadingProvider: "google" | "apple" | null;
    isAuthenticated: boolean;
    isInitializing: boolean;
    isLoading: boolean;
    error: string | null;

    loginWithGoogle: () => void;
    loginWithApple: () => void;
    exchangeCode: (code: string) => Promise<boolean>;
    tokenRefresh: (refreshToken: string) => Promise<boolean>;
    initializeAuth: () => Promise<void>;
    logout: () => Promise<boolean>;
}

const useAuthStore = create<AuthState>((set, get) => ({
    loadingProvider: null,
    isLoading: false,
    error: null,
    isAuthenticated: false,
    isInitializing: true,
    loginWithGoogle: () => {
        set({
            loadingProvider: "google"
        });
        authService.loginWithGoogle();
    },
    loginWithApple: () => {
        set({
            loadingProvider: "apple"
        });
        authService.loginWithApple();
    },
    exchangeCode: async (code: string) => {
        try {
            set({
                isLoading: true,
                isAuthenticated: false,
                error: null,
            });

            const tokens = await authService.exchangeCode(code);

            tokenStorage.saveTokens(tokens);

            set({
                isLoading: false,
                isAuthenticated: true,
            });

            return true;
        } catch (error) {
            set({
                isLoading: false,
                isAuthenticated: false,
                error: "Unable to complete sign in. Please try again.",
            });

            return false;
        }
    },
    tokenRefresh: async (refreshToken: string) => {
        try {
            set({
                isLoading: true,
                isAuthenticated: false,
                error: null,
            });

            const tokens = await authService.tokenRefresh(refreshToken);

            tokenStorage.saveTokens(tokens);

            set({
                isLoading: false,
                isAuthenticated: true,
            });

            return true;
        } catch (error) {
            set({
                isLoading: false,
                isAuthenticated: false,
                error: "Something unexpected happened.",
            });

            return false;
        }
    },
    initializeAuth: async () => {
        try {
            set({
                isInitializing: true,
                error: null,
            });

            const refreshToken = tokenStorage.getRefreshToken();

            // User has no saved session
            if (!refreshToken) {
                set({
                    isAuthenticated: false,
                });

                return;
            }

            // Attempt to restore session
            await get().tokenRefresh(refreshToken);

        } finally {
            set({
                isInitializing: false,
            });
        }
    },
    logout: async () => {
        try {
            set({
                isLoading: true,
            });

            const refreshToken = tokenStorage.getRefreshToken();

            if (refreshToken) {
                await authService.revokeTokens(refreshToken);
            }


            tokenStorage.clearTokens();
            userStorage.deleteUser();

            set({
                isLoading: false,
                isAuthenticated: false,
            });

            return true;
        } catch (error) {
            tokenStorage.clearTokens();
            userStorage.deleteUser();

            set({
                isLoading: false,
                isAuthenticated: false,
            });

            return false;
        }

    },
}));

export default useAuthStore;