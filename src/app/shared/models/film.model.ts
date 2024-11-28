export interface Film {
    id?: number;
    titre: string;
    duree?: number;
    realisateur?: string;
    description?: string;
    photo?: string;
    dateSortie?: Date;
    categorieId?: number;
  }