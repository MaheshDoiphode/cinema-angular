export interface Payment {
  id?: number;
  amount: number;
  status: 'PENDING' | 'COMPLETED' | 'REFUND_REQUESTED' | 'REFUNDED' | 'REFUND_REJECTED';
  transactionId?: string;
  userEmail?: string;
  ticketId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}