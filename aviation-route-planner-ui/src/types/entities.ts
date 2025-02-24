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
    transportationDays: DaysOfWeek[];
}

export enum TransportationType {
    FLIGHT = "FLIGHT",
    BUS = "BUS",
    SUBWAY = "SUBWAY",
    UBER = "UBER"
}

export enum DaysOfWeek {
    MONDAY = "MONDAY",
    TUESDAY = "TUESDAY",
    WEDNESDAY = "WEDNESDAY",
    THURSDAY = "THURSDAY",
    FRIDAY = "FRIDAY",
    SATURDAY = "SATURDAY",
    SUNDAY = "SUNDAY"
}