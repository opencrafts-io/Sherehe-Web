import axios from "axios";

export function getErrorMessage(error: unknown): string {
    const fallback = "Something went wrong. Please try again.";

    if (axios.isAxiosError(error)) {
        return error.response?.data?.error ?? error.response?.data.message ?? fallback;
    }

    if (error instanceof Error) {
        return error.message;
    }

    return fallback;
}
