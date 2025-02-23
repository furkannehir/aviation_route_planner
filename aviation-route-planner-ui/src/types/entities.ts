export interface Location {
    id: number;
    name: string;
    city: string;
    country: string;
    locationCode: string;
}

export interface Transportation {
    id: number;
    origin: Location;
    destination: Location;
    transportationType: TransportationType;
}

export enum TransportationType {
    FLIGHT = "FLIGHT",
    BUS = "BUS",
    TRAIN = "TRAIN",
    FERRY = "FERRY"
}

// ...existing interfaces...