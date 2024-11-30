export interface EnhancedFilm {
    id?: number;
    title: string;
    year: string;
    rated: string;
    released: string;
    runtime: string;
    genre: string;
    director: string;
    plot: string;
    poster: string;
    writer: string;
    actors: string;
    language: string;
    country: string;
    awards: string;
    ratings: {
        source: string;
        value: string;
    }[];
    imdbRating: string;
    boxOffice: string;
}