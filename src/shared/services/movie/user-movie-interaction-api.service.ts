import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IS_ACCESS_TOKEN_REQURED } from 'src/shared/interceptors';
import { IUserMovieInteractionApiService } from 'src/shared/interfaces';
import { Movie, MovieStats } from 'src/shared/models';

@Injectable({
  providedIn: 'root'
})
export class UserMovieInteractionApiService implements IUserMovieInteractionApiService {

  constructor(private httpClient: HttpClient) { }

  getRating$(movieId: string): Observable<number> {
    return this.httpClient.get<number>(
      `${environment.serverUrl}/movie/rating/${movieId}`,
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    );
  }

  getStats$(movieId: string): Observable<MovieStats> {
    return this.httpClient.get<MovieStats>(
      `${environment.serverUrl}/movie/stats/${movieId}`,
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    );
  }

  rateMovie$(movieId: string, rating: number): Observable<MovieStats> {
    return this.httpClient.post<MovieStats>(
      `${environment.serverUrl}/movie/rate`,
      { movieId: String(movieId), rating },
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    );
  }

  watchMovie$(movieId: string): Observable<MovieStats> {
    return this.httpClient.post<MovieStats>(
      `${environment.serverUrl}/movie/watch`,
      { movieId: String(movieId) },
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    );
  }

  unwatchMovie$(movieId: string): Observable<MovieStats> {
    return this.httpClient.post<MovieStats>(
      `${environment.serverUrl}/movie/unwatch`,
      { movieId: String(movieId) },
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    );
  }

  addMovieToFavourites$(movieId: string): Observable<MovieStats> {
    return this.httpClient.post<MovieStats>(
      `${environment.serverUrl}/favourites`,
      { movieId },
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    );
  }

  removeMovieFromFavourites$(movieId: string): Observable<MovieStats> {
    return this.httpClient.delete<MovieStats>(
      `${environment.serverUrl}/favourites/${movieId}`,
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    );
  }
  
  getFavourites$(userId: number): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(
      `${environment.serverUrl}/favourites/${userId}`,
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    );
  }

}
