import { create } from "zustand";
import authService from "../services/auth_service";

interface AuthState {
    loadingProvider: "google" | "apple" | null;
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
                error: null,
            });

            const tokens = await authService.exchangeCode(code);
            console.log(tokens);
            set({
                isLoading: false,
            });
            return true;
        } catch (error) {
            set({
                isLoading: false,
                error: "Unable to complete sign in. Please try again."
            });
            return false;
        }
    },
}));

export default useAuthStore;