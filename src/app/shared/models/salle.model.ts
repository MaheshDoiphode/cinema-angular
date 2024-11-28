export interface Salle {
    id: number;
    name: string;
    nombrePlaces: number;
    cinemaId: number;
    configuredPlaces?: number;
}