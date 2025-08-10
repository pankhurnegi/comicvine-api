import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie, ApiResponse } from '../../models/movie.model';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-movie-list',
    templateUrl: './movie-list.component.html',
    styleUrls: ['./movie-list.component.css'],
    standalone: true,
    imports: [CommonModule]
})
export class MovieListComponent implements OnInit {
    movies: Movie[] = [];
    loading = false;
    error: string | null = null;
    currentPage = 1;
    itemsPerPage = 8;
    totalItems = 0;
    totalPages = 0;

    constructor(private movieService: MovieService) { }

    ngOnInit(): void {
        this.loadMovies();
    }

    loadMovies(): void {
        this.loading = true;
        this.error = null;
        const offset = (this.currentPage - 1) * this.itemsPerPage;

        this.movieService.getMovies(this.itemsPerPage, offset).subscribe({
            next: (response: ApiResponse) => {
                if (response.status_code === 1) {
                    this.movies = response.results;
                    this.totalItems = response.number_of_total_results;
                    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
                } else {
                    this.error = 'Failed to load movies.';
                }
                this.loading = false;
            },
            error: () => {
                this.error = 'Error loading movies. Please try again.';
                this.loading = false;
            }
        });
    }

    onPageChange(page: number): void {
        if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
            this.currentPage = page;
            this.loadMovies();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    getPaginationPages(): number[] {
        const pages: number[] = [];
        const maxVisiblePages = 5;
        const halfVisible = Math.floor(maxVisiblePages / 2);
        let startPage = Math.max(1, this.currentPage - halfVisible);
        let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    }

    getImageUrl(movie: Movie): string {
        return movie.image?.medium_url || movie.image?.small_url || movie.image?.thumb_url || 'assets/placeholder-movie.jpg';
    }

    formatDate(dateString: string | undefined): string {
        if (!dateString) return 'Unknown';
        return new Date(dateString).toLocaleDateString();
    }

    stripHtml(html: string | undefined): string {
        if (!html) return '';
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    }

    getMin(a: number, b: number): number {
        return Math.min(a, b);
    }
}
