import {
    AxiosError,
    type AxiosInstance,
    type InternalAxiosRequestConfig,
} from "axios";

import tokenStorage from "../utils/token_storage";
import useAuthStore from "../stores/auth_store";

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

let refreshPromise: Promise<boolean> | null = null;

export function attachAuthInterceptor(api: AxiosInstance) {

    // Request interceptor
    api.interceptors.request.use((config) => {

        const accessToken = tokenStorage.getAccessToken();

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    });


    // Response interceptor
    api.interceptors.response.use(
        (response) => response,

        async (error: AxiosError) => {

            const originalRequest =
                error.config as RetryableRequestConfig | undefined;

            // Only handle 401 responses
            if (error.response?.status !== 401 || !originalRequest) {
                return Promise.reject(error);
            }

            // Prevent infinite retry loops
            if (originalRequest._retry) {
                return Promise.reject(error);
            }

            originalRequest._retry = true;

            const refreshToken =
                tokenStorage.getRefreshToken();

            // No refresh token then logout
            if (!refreshToken) {
                handleAuthenticationFailure();

                return Promise.reject(error);
            }

            try {

                // If another request is already refreshing,
                // wait for that request.
                if (!refreshPromise) {
                    refreshPromise =
                        useAuthStore
                            .getState()
                            .tokenRefresh(refreshToken);
                }

                const refreshSuccessful =
                    await refreshPromise;

                refreshPromise = null;

                if (!refreshSuccessful) {
                    handleAuthenticationFailure();

                    return Promise.reject(error);
                }

                const newAccessToken =
                    tokenStorage.getAccessToken();

                if (!newAccessToken) {
                    handleAuthenticationFailure();

                    return Promise.reject(error);
                }

                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;

                // Retry original request
                return api(originalRequest);

            } catch (refreshError) {

                refreshPromise = null;

                handleAuthenticationFailure();

                return Promise.reject(refreshError);
            }
        }
    );
}

async function handleAuthenticationFailure() {
    await useAuthStore.getState().logOut();

    window.location.href = "/login";
}