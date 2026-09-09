import axios from "axios";
import { VERISAFE_BASE_URL } from "../config/env";

const verisafeApi = axios.create({
    baseURL: VERISAFE_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default verisafeApi;