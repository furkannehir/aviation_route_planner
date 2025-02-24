import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getLocations = async () => {
    const response = await axios.get(`${BASE_URL}/locations`);
    return response.data;
};

export const createLocation = async (location: any) => {
    const response = await axios.post(`${BASE_URL}/locations`, location);
    return response.data;
}

export const updateLocation = async (location: any) => {
    const id = location.id;
    const body = { ...location };
    delete body.id;
    const response = await axios.put(`${BASE_URL}/locations/${id}`, body);
    return response.data;
}

export const deleteLocation = async (id: number) => {
    const response = await axios.delete(`${BASE_URL}/locations/${id}`);
    return response.data;
}

export const getTransportations = async () => {
    const response = await axios.get(`${BASE_URL}/transportations`);
    return response.data;
};

export const createTransportation = async (transportation: any) => {
    const response = await axios.post(`${BASE_URL}/transportations`, transportation);
    return response.data;
}

export const updateTransportation = async (id:number, transportation: any) => {
    console.log(id);
    console.log(transportation);
    const response = await axios.put(`${BASE_URL}/transportations/${id}`, transportation);
    return response.data;
}

export const deleteTransportation = async (id: number) => {
    const response = await axios.delete(`${BASE_URL}/transportations/${id}`);
    return response.data;
}

export const getRoutes = async (originId:number, destinationId:number, date:string) => {
    const response = await axios.get(`${BASE_URL}/routes`, {
        params: { originId, destinationId, date },
    });
    return response.data;
};
