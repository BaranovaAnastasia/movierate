import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IS_API_REQUEST } from 'src/shared/interceptors';
import { IMovieApiService } from 'src/shared/interfaces';
import { Credits, Movie, Trailer } from 'src/shared/models';
import { ErrorService } from '../error.service';
import { constructRequestUrl } from '../functions';
import { CREDITS_ERROR_MSG, CREDITS_PATH, MOVIE_ERROR_MSG, MOVIE_PATH, SEARCH_ERROR_MSG, SEARCH_PATH, TRAILER_ERROR_MSG, TRAILER_PATH } from './constants';

@Injectable({
  providedIn: 'root'
})
export class TMDBMovieApiService implements IMovieApiService {

  constructor(
    private httpClient: HttpClient,
    private errorService: ErrorService
  ) { }

  getMovie$(id: string): Observable<Movie | undefined> {
    return this.httpClient.get<Movie>(
      constructRequestUrl(
        environment.serverUrl,
        MOVIE_PATH,
        `/${id}`
      ),
      { context: new HttpContext().set(IS_API_REQUEST, true) }
    ).pipe(
      catchError(error => {
        this.errorService.showError(error, MOVIE_ERROR_MSG);
        return of(undefined);
      })
    );
  }

  getTrailer$(id: string): Observable<Trailer | undefined> {
    return this.httpClient.get<Trailer>(
      constructRequestUrl(
        environment.serverUrl,
        TRAILER_PATH,
        `/${id}`
      ),
      { context: new HttpContext().set(IS_API_REQUEST, true) }
    ).pipe(
      catchError(error => {
        this.errorService.showError(error, TRAILER_ERROR_MSG);
        return of(undefined);
      })
    );
  }

  getCredits$(id: string): Observable<Credits | undefined> {
    return this.httpClient.get<Credits>(
      constructRequestUrl(
        environment.serverUrl,
        CREDITS_PATH,
        `/${id}`
      ),
      { context: new HttpContext().set(IS_API_REQUEST, true) }
    ).pipe(
      catchError(error => {
        this.errorService.showError(error, CREDITS_ERROR_MSG);
        return of(undefined);
      })
    );
  }

  searchMovies$(query: string, page: number): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(
      constructRequestUrl(
        environment.serverUrl,
        SEARCH_PATH,
        undefined,
        { 'term': query, 'page': page }
      ),
      { context: new HttpContext().set(IS_API_REQUEST, true) }
    ).pipe(
      catchError(error => {
        this.errorService.showError(error, SEARCH_ERROR_MSG);
        return of([]);
      })
    );
  }

}
