import axios from "axios";
import { apiKey, baseURL } from "../data/values";

const api = axios.create({
    baseURL: baseURL,
    params: {
        'api-key': apiKey
    }
});

export default api;