import { create } from "zustand";
import authService from "../services/auth_service";

interface AuthState {
    loadingProvider: "google" | "apple" | null;
    error: string | null;
    loginWithGoogle: () => void;
    loginWithApple: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
    loadingProvider: null,
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
}));

export default useAuthStore;