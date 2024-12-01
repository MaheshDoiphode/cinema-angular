export interface Place {
    id?: number;
    numero: number;
    rowNumber: number;
    columnNumber: number;
    salleId: number;
    reservee?: boolean;
    isBooked?: boolean;
  }
  
  export interface PlaceConfiguration {
    salleId: number;
    totalRows: number;
    totalColumns: number;
  }
  
  export interface PlaceConfigurationResponse extends PlaceConfiguration {
    places: Place[];
    message: string;
  }