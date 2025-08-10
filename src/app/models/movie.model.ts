export interface Movie {
    id: number;
    name: string;
    deck?: string;
    image?: {
        icon_url?: string;
        medium_url?: string;
        small_url?: string;
        thumb_url?: string;
    };
    release_date?: string;
    runtime?: number;
    rating?: string;
}

export interface ApiResponse {
    status_code: number;
    results: Movie[];
    number_of_total_results: number;
}
