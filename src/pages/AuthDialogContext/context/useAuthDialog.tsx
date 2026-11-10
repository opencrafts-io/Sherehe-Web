import { useContext } from "react";
import { AuthDialogContext } from "../authDialogContext";

export const useAuthDialog = () => {
    const context = useContext(AuthDialogContext);

    if (!context) {
        throw new Error(
            "useAuthDialog must be used within AuthDialogProvider"
        );
    }

    return context;
};