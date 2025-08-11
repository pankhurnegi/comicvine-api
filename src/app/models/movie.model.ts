export interface Movie {
    id: number;
    name: string;
    deck?: string;
    release_date?: string;
    runtime?: number;
    rating?: string;
}

export interface ApiResponse {
    status_code: number;
    results: Movie[];
    number_of_total_results: number;
}
