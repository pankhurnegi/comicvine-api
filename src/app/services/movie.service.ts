import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/movie.model';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private apiUrl = 'http://localhost:3000/api/movies'; 
  constructor(private http: HttpClient) { }   

  getMovies(limit: number, offset: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}?limit=${limit}&offset=${offset}`);
  }
}

