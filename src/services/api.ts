import axios from "axios";
import { SHEREHE_BASE_URL, VERISAFE_BASE_URL } from "../config/env";
import { attachAuthInterceptor } from "./axiosInterceptor";

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

export const shereheApis = axios.create({
    baseURL: SHEREHE_BASE_URL,
});

attachAuthInterceptor(verisafeLoggedInApi);
attachAuthInterceptor(shereheApis);