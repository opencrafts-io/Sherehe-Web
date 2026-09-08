import { VERISAFE_BASE_URL } from "../config/env";

class AuthService {
    loginWithProvider(provider: "google" | "apple") {
        const redirectUri = `${window.location.origin}/auth/callback`;

        const url =
            `${VERISAFE_BASE_URL}/auth/${provider}?deep_link=${encodeURIComponent(redirectUri)}`;

        window.location.href = url;
    }

    loginWithGoogle() {
        this.loginWithProvider("google");
    }

    loginWithApple() {
        this.loginWithProvider("apple");
    }
}

export default new AuthService();