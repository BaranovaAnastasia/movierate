import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserMovieInteractionApiService } from '../../interfaces/IUserMovieInteractionApiService';
import { MovieStats } from '../../models/movie/movie-stats';

const host = 'http://localhost:3000/movie';

@Injectable({
  providedIn: 'root'
})
export class UserMovieInteractionApiService implements IUserMovieInteractionApiService {

  constructor(private httpClient: HttpClient) { }
  
  rateMovie$(movieId: string, rating: number): Observable<MovieStats> {
    return this.httpClient.post<MovieStats>(
      `${host}/rate`,
      { movieId, rating }
    );
  }
  
  watchMovie$(movieId: string): Observable<MovieStats> {
    throw new Error('Method not implemented.');
  }

  getRating$(movieId: string): Observable<number> {
    return this.httpClient.get<number>(
      `${host}/rating/${movieId}`
    );
  }

  isWatched$(movieId: string): Observable<boolean> {
    return this.httpClient.get<boolean>(
      `${host}/iswatched/${movieId}`
    );
  }

  getStats$(movieId: string): Observable<MovieStats> {
    return this.httpClient.get<MovieStats>(
      `${host}/stats/${movieId}`
    );
  }

}
