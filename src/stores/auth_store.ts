import { create } from "zustand";
import authService from "../services/auth_service";
import tokenStorage from "../utils/token_storage";

interface AuthState {
    loadingProvider: "google" | "apple" | null;
    isAuthenticated: boolean;
    error: string | null;
    loginWithGoogle: () => void;
    loginWithApple: () => void;
    isLoading: boolean;
    exchangeCode: (code: string) => Promise<boolean>;
}

const useAuthStore = create<AuthState>((set) => ({
    loadingProvider: null,
    isLoading: false,
    error: null,
    isAuthenticated: false,
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
    exchangeCode: async (code: string): Promise<boolean> => {
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
                error: "Unabtoken_storagele to complete sign in. Please try again.",
            });

            return false;
        }
    },
}));

export default useAuthStore;