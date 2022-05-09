import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUserMovieInteractionApiService } from 'src/shared/interfaces';
import { MovieStats } from 'src/shared/models';

@Injectable({
  providedIn: 'root'
})
export class UserMovieInteractionApiService implements IUserMovieInteractionApiService {

  constructor(private httpClient: HttpClient) { }

  rateMovie$(movieId: string, rating: number): Observable<MovieStats> {
    return this.httpClient.post<MovieStats>(
      `${environment.serverUrl}/movie/rate`,
      { movieId: String(movieId), rating }
    );
  }

  watchMovie$(movieId: string): Observable<MovieStats> {
    return this.httpClient.post<MovieStats>(
      `${environment.serverUrl}/movie/watch`,
      { movieId: String(movieId) }
    );
  }

  unwatchMovie$(movieId: string): Observable<MovieStats> {
    return this.httpClient.post<MovieStats>(
      `${environment.serverUrl}/movie/unwatch`,
      { movieId: String(movieId) }
    );
  }

  getRating$(movieId: string): Observable<number> {
    return this.httpClient.get<number>(
      `${environment.serverUrl}/movie/rating/${movieId}`
    );
  }

  isWatched$(movieId: string): Observable<boolean> {
    return this.httpClient.get<boolean>(
      `${environment.serverUrl}/movie/iswatched/${movieId}`
    );
  }

  getStats$(movieId: string): Observable<MovieStats> {
    return this.httpClient.get<MovieStats>(
      `${environment.serverUrl}/movie/stats/${movieId}`
    );
  }

}
