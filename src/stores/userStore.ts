import { create } from "zustand";
import type { User } from "../models/user";
import userService from "../services/userService";
import { persist } from 'zustand/middleware';

interface UserState {
    isLoading: boolean;
    error: string | null;
    user: User | null;

    fetchUserData: () => Promise<void>;
    clearUserData: () => void;
}

const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            isLoading: false,
            error: null,
            user: null,
            fetchUserData: async () => {
            console.log("Entered function for user data");
                try {
                    set({
                        isLoading: true,
                        user: null,
                        error: null
                    });

                    const user = await userService.getUserData();

                    set({
                        isLoading: false,
                        user,
                    });
                }

                catch (error) {
                    console.log("Error occurred while fetching user data", error);
                    set({
                        isLoading: false,
                        user: null,
                        error: "Something wrong happened, please try again",
                    });
                }
            },
            clearUserData: () => {
                set({
                    user: null,
                    isLoading: false,
                    error: null,
                });
            },
        }),
        {
            name: "sherehe-user-storage",

            partialize: (state) => ({
                user: state.user,
            }),

            onRehydrateStorage: () => {
                return (_, error) => {
                    console.log("Fetching of user data hydration has started");

                    if (error) {
                        console.log("An error occurred while fetching user data", error);
                    }
                };
            },
        }
    )
);

export default useUserStore;
