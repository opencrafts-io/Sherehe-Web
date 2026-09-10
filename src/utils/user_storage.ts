import type { User } from "../models/user";

class UserStorage {
    private readonly USER_KEY = "user";

    saveUser(user: User): void {
        localStorage.setItem(
            this.USER_KEY,
            JSON.stringify(user)
        );
    }

    getUser(): User | null {
        const userData = localStorage.getItem(this.USER_KEY);

        if (!userData) {
            return null;
        }

        try {
            return JSON.parse(userData) as User;
        } catch (error) {
            console.error("Failed to parse stored user data", error);

            return null;
        }
    }

    deleteUser(): void {
        localStorage.removeItem(this.USER_KEY);
    }
}

export default new UserStorage();