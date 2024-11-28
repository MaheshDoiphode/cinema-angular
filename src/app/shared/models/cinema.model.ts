export interface Cinema {
  id?: number;
  name: string;
  longitude?: number;
  latitude?: number;
  altitude?: number;
  nombreSalles: number;
  villeId?: number;
  ownerEmail?: string;
  status?: 'PENDING' | 'VERIFIED';
}