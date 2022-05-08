import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserMovieInteractionApiService } from 'src/shared/interfaces';
import { MovieStats } from 'src/shared/models';

const host = 'https://movierate-backend.herokuapp.com/movie';

@Injectable({
  providedIn: 'root'
})
export class UserMovieInteractionApiService implements IUserMovieInteractionApiService {

  constructor(private httpClient: HttpClient) { }

  rateMovie$(movieId: string, rating: number): Observable<MovieStats> {
    return this.httpClient.post<MovieStats>(
      `${host}/rate`,
      { movieId: String(movieId), rating }
    );
  }

  watchMovie$(movieId: string): Observable<MovieStats> {
    return this.httpClient.post<MovieStats>(
      `${host}/watch`,
      { movieId: String(movieId) }
    );
  }

  unwatchMovie$(movieId: string): Observable<MovieStats> {
    return this.httpClient.post<MovieStats>(
      `${host}/unwatch`,
      { movieId: String(movieId) }
    );
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
