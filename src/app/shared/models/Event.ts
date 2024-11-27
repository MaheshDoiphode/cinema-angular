export interface Event {
    date: string;
    matches: {
        imgSrc: string;
        altText: string;
        teams: string;
        description: string;
        result: string;
        type: string;
    }[];
}
