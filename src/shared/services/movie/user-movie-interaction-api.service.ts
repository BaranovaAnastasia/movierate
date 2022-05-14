import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IS_ACCESS_TOKEN_REQURED } from 'src/shared/interceptors';
import { IUserMovieInteractionApiService } from 'src/shared/interfaces';
import { Movie, MovieStats } from 'src/shared/models';
import { ErrorService } from '../error.service';

@Injectable({
  providedIn: 'root'
})
export class UserMovieInteractionApiService implements IUserMovieInteractionApiService {

  constructor(
    private httpClient: HttpClient,
    private errorService: ErrorService
  ) { }

  getRating$(movieId: string): Observable<number | undefined> {
    return this.httpClient.get<number>(
      `${environment.serverUrl}/movie/rating/${movieId}`,
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    ).pipe(
      catchError(error => {
        this.errorService.showError(error, 'Cannot get movie rating.');
        return of(undefined);
      })
    );
  }

  getStats$(movieId: string): Observable<MovieStats | undefined> {
    return this.httpClient.get<MovieStats>(
      `${environment.serverUrl}/movie/stats/${movieId}`,
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    ).pipe(
      catchError(error => {
        this.errorService.showError(error, 'Cannot get movie statistics.');
        return of(undefined);
      })
    );
  }

  rateMovie$(movieId: string, rating: number): Observable<MovieStats | undefined> {
    return this.httpClient.post<MovieStats>(
      `${environment.serverUrl}/movie/rate`,
      { movieId: String(movieId), rating },
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    ).pipe(
      catchError(error => {
        this.errorService.showError(error, 'Cannot rate movie.');
        return of(undefined);
      })
    );
  }

  watchMovie$(movieId: string): Observable<MovieStats | undefined> {
    return this.httpClient.post<MovieStats>(
      `${environment.serverUrl}/movie/watch`,
      { movieId: String(movieId) },
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    ).pipe(
      catchError(error => {
        this.errorService.showError(error, 'Cannot mark movie as watched.');
        return of(undefined);
      })
    );
  }

  unwatchMovie$(movieId: string): Observable<MovieStats | undefined> {
    return this.httpClient.post<MovieStats>(
      `${environment.serverUrl}/movie/unwatch`,
      { movieId: String(movieId) },
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    ).pipe(
      catchError(error => {
        this.errorService.showError(error, 'Cannot remove movie from watched.');
        return of(undefined);
      })
    );
  }

  addMovieToFavourites$(movieId: string): Observable<MovieStats | undefined> {
    return this.httpClient.post<MovieStats>(
      `${environment.serverUrl}/favourites`,
      { movieId },
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    ).pipe(
      catchError(error => {
        this.errorService.showError(error, 'Cannot add movie to favourites.');
        return of(undefined);
      })
    );
  }

  removeMovieFromFavourites$(movieId: string): Observable<MovieStats | undefined> {
    return this.httpClient.delete<MovieStats>(
      `${environment.serverUrl}/favourites/${movieId}`,
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    ).pipe(
      catchError(error => {
        this.errorService.showError(error, 'Cannot remove movie from favourites.');
        return of(undefined);
      })
    );
  }

  getFavourites$(userId: number): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(
      `${environment.serverUrl}/favourites/${userId}`,
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    ).pipe(
      catchError(error => {
        this.errorService.showError(error, 'Cannot get favourites.');
        return of([]);
      })
    );
  }

}
