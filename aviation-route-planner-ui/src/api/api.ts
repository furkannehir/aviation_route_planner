import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getLocations = async () => {
    const response = await axios.get(`${BASE_URL}/locations`);
    return response.data;
};

export const getTransportations = async () => {
    const response = await axios.get(`${BASE_URL}/transportations`);
    return response.data;
};

export const getRoutes = async (originId:number, destinationId:number) => {
    const response = await axios.get(`${BASE_URL}/routes`, {
        params: { originId, destinationId },
    });
    return response.data;
};
