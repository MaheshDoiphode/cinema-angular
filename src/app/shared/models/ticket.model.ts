import { Payment } from "./payment.model";

export interface Ticket {
    id?: number;
    nomClient: string;
    prix: number;
    codePayement: number;
    reservee: boolean;
    userEmail?: string;
    placeId?: number;
    projectionFilmId?: number;
    createdAt?: Date;
    // Additional display fields
    seatNumber?: number;
    rowNumber?: number;
    columnNumber?: number;
    salleName?: string;
    cinemaName?: string;
    filmTitle?: string;
    projectionDate?: Date;
    seanceTime?: Date;
}

export interface TicketBookingResponse {
  tickets: Ticket[];
  payment: Payment;
  totalAmount: number;
  transactionId: string;
  bookingDate: Date;
  filmTitle: string;
  cinemaName: string;
  projectionDate: Date;
  seanceTime: Date;
}
export interface TicketBookingRequest {
    projectionId: number;
    placeIds: number[];
    nomClient: string;
}