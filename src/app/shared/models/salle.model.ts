export interface Salle {
    id?: number;
    name: string;
    nombrePlaces: number;
    cinemaId: number;
    configuredPlaces?: number;
}

export enum HallPricing {
    STANDARD = 15.99,
    VIP = 24.99,
    PREMIUM = 19.99
}