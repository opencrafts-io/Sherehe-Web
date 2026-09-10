import axios from "axios";
import { VERISAFE_BASE_URL } from "../config/env";
import { attachAuthInterceptor } from "./axios_interceptor";

export const verisafeApi = axios.create({
    baseURL: VERISAFE_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const verisafeLoggedInApi = axios.create({
    baseURL: VERISAFE_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

attachAuthInterceptor(verisafeLoggedInApi);