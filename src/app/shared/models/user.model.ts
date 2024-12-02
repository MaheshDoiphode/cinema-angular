import { Ticket } from "./ticket.model";

export interface EmailRequest {
    email: string;
}

export interface User {
    email: string;
    password_hash?: string;
    name: string;
    role: 'USER' | 'ADMIN' | 'CINEMA_OWNER';
    profile_pic?: string;
}
export interface UserProfile extends User {
    tickets?: Ticket[];
    totalBookings?: number;
    recentBookings?: Ticket[];
}