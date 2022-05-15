import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IS_ACCESS_TOKEN_REQURED } from 'src/shared/interceptors';
import { IUserMovieInteractionApiService } from 'src/shared/interfaces';
import { Movie, MovieStats } from 'src/shared/models';
import { ErrorService } from '../error.service';
import { constructRequestUrl } from '../functions';
import { ADD_TO_FAVOURITES_ERROR_MSG, FAVOURITES_PATH, GET_FAVOURITES_ERROR_MSG, GET_WATCHED_ERROR_MSG, RATE_ERROR_MSG, RATE_PATH, RATING_ERROR_MSG, RATING_PATH, REMOVE_FROM_FAVOURITES_ERROR_MSG, STATS_ERROR_MSG, STATS_PATH, UNWATCH_ERROR_MSG, WATCHED_PATH, WATCH_ERROR_MSG } from './constants';

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
      constructRequestUrl(
        environment.serverUrl,
        RATING_PATH,
        `/${movieId}`
      ),
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    ).pipe(
      catchError(error => {
        this.errorService.showError(error, RATING_ERROR_MSG);
        return of(undefined);
      })
    );
  }

  getStats$(movieId: string): Observable<MovieStats | undefined> {
    return this.httpClient.get<MovieStats>(
      constructRequestUrl(
        environment.serverUrl,
        STATS_PATH,
        `/${movieId}`
      ),
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    ).pipe(
      catchError(error => {
        this.errorService.showError(error, STATS_ERROR_MSG);
        return of(undefined);
      })
    );
  }

  rateMovie$(movieId: string, rating: number): Observable<MovieStats | undefined> {
    return this.httpClient.post<MovieStats>(
      constructRequestUrl(
        environment.serverUrl,
        RATE_PATH
      ),
      { movieId: String(movieId), rating },
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    ).pipe(
      catchError(error => {
        this.errorService.showError(error, RATE_ERROR_MSG);
        return of(undefined);
      })
    );
  }

  watchMovie$(movieId: string): Observable<MovieStats | undefined> {
    return this.httpClient.post<MovieStats>(
      constructRequestUrl(
        environment.serverUrl,
        WATCHED_PATH,
        `/${movieId}`
      ),
      { },
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    ).pipe(
      catchError(error => {
        this.errorService.showError(error, WATCH_ERROR_MSG);
        return of(undefined);
      })
    );
  }

  unwatchMovie$(movieId: string): Observable<MovieStats | undefined> {
    return this.httpClient.delete<MovieStats>(
      constructRequestUrl(
        environment.serverUrl,
        WATCHED_PATH,
        `/${movieId}`
      ),
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    ).pipe(
      catchError(error => {
        this.errorService.showError(error, UNWATCH_ERROR_MSG);
        return of(undefined);
      })
    );
  }

  getWatched$(userId: number): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(
      constructRequestUrl(
        environment.serverUrl,
        WATCHED_PATH,
        `/${userId}`
      ),
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    ).pipe(
      catchError(error => {
        this.errorService.showError(error, GET_WATCHED_ERROR_MSG);
        return of([]);
      })
    );
  }

  addMovieToFavourites$(movieId: string): Observable<MovieStats | undefined> {
    return this.httpClient.post<MovieStats>(
      constructRequestUrl(
        environment.serverUrl,
        FAVOURITES_PATH
      ),
      { movieId },
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    ).pipe(
      catchError(error => {
        this.errorService.showError(error, ADD_TO_FAVOURITES_ERROR_MSG);
        return of(undefined);
      })
    );
  }

  removeMovieFromFavourites$(movieId: string): Observable<MovieStats | undefined> {
    return this.httpClient.delete<MovieStats>(
      constructRequestUrl(
        environment.serverUrl,
        FAVOURITES_PATH,
        `/${movieId}`
      ),
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    ).pipe(
      catchError(error => {
        this.errorService.showError(error, REMOVE_FROM_FAVOURITES_ERROR_MSG);
        return of(undefined);
      })
    );
  }

  getFavourites$(userId: number): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(
      constructRequestUrl(
        environment.serverUrl,
        FAVOURITES_PATH,
        `/${userId}`
      ),
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    ).pipe(
      catchError(error => {
        this.errorService.showError(error, GET_FAVOURITES_ERROR_MSG);
        return of([]);
      })
    );
  }

}
