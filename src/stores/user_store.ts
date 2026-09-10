import { create } from "zustand";
import type { User } from "../models/user";
import userService from "../services/user_service";
import userStorage from "../utils/user_storage";

interface UserState {
    isLoading: boolean;
    error: string | null;
    user: User | null;

    fetchUserData: () => Promise<void>;
    getCachedUserData: () => void;
}

const useUserStore = create<UserState>((set) => ({
    isLoading: false,
    error: null,
    user: null,
    fetchUserData: async () => {
        try {
            set({
                isLoading: true,
                user: null,
                error: null
            });

            const user = await userService.getUserData();

            userStorage.saveUser(user);

            set({
                isLoading: false,
                user,
            });
        }

        catch (error) {
            set({
                isLoading: false,
                user: null,
                error: "Something wrong happened, please try again",
            });
        }
    },
    getCachedUserData: () => {
        const user = userStorage.getUser();
        set({
            user
        });
    },
}));