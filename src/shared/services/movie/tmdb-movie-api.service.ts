import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IS_API_REQUEST } from 'src/shared/interceptors';
import { IMovieApiService } from 'src/shared/interfaces';
import { Credits, Movie, TMDBCredits, TMDBMovie, TMDBSearchResult, TMDBVideos, Trailer } from 'src/shared/models';
import { ErrorService } from '../error.service';
import { constructRequestUrl } from '../functions';
import { CREDITS_ERROR_MSG, MOVIE_DIRECTOR, MOVIE_ERROR_MSG, MOVIE_PATH, MOVIE_WRITER, SEARCH_ERROR_MSG, SEARCH_PATH, TRAILER_ERROR_MSG, TRAILER_TYPE } from './constants';

@Injectable({
  providedIn: 'root'
})
export class TMDBMovieApiService implements IMovieApiService {

  constructor(
    private httpClient: HttpClient,
    private errorService: ErrorService
  ) { }

  getMovie$(id: string): Observable<Movie | undefined> {
    return this.httpClient.get<TMDBMovie>(
      constructRequestUrl(
        environment.tmdbApiUrl,
        MOVIE_PATH,
        `/${id}`,
        { 'api_key': environment.tmdbApiKey }
      ),
      { context: new HttpContext().set(IS_API_REQUEST, true) }
    ).pipe(
      map(result => this.TMDBMovie2Movie(result)),

      catchError(error => {
        this.errorService.showError(error, MOVIE_ERROR_MSG);
        return of(undefined);
      })
    );
  }

  getTrailer$(id: string): Observable<Trailer | undefined> {
    return this.httpClient.get<TMDBVideos>(
      constructRequestUrl(
        environment.tmdbApiUrl,
        MOVIE_PATH,
        `/${id}/videos`,
        { 'api_key': environment.tmdbApiKey }
      ),
      { context: new HttpContext().set(IS_API_REQUEST, true) }
    ).pipe(
      map(result => result.results.find(video => video.type === TRAILER_TYPE)),

      catchError(error => {
        this.errorService.showError(error, TRAILER_ERROR_MSG);
        return of(undefined);
      })
    );
  }

  getCredits$(id: string): Observable<Credits | undefined> {
    return this.httpClient.get<TMDBCredits>(
      constructRequestUrl(
        environment.tmdbApiUrl,
        MOVIE_PATH,
        `/${id}/credits`,
        { 'api_key': environment.tmdbApiKey }
      ),
      { context: new HttpContext().set(IS_API_REQUEST, true) }
    ).pipe(
      map(result => Object.assign(
        {
          cast: result.cast
            .filter(member => member.order < 4)
            .map(value => value.name)
        },
        {
          directors: result.crew
            .filter(member => member.job === MOVIE_DIRECTOR)
            .map(value => value.name)
        },
        {
          writers: result.crew
            .filter(member => member.department === MOVIE_WRITER)
            .map(value => value.name)
        }
      )),

      catchError(error => {
        this.errorService.showError(error, CREDITS_ERROR_MSG);
        return of(undefined);
      })
    );
  }

  searchMovies$(query: string, page: number): Observable<Movie[]> {
    return this.httpClient.get<TMDBSearchResult>(
      constructRequestUrl(
        environment.tmdbApiUrl,
        SEARCH_PATH,
        undefined,
        {
          'api_key': environment.tmdbApiKey,
          'query': query,
          'page': page
        }
      ),
      { context: new HttpContext().set(IS_API_REQUEST, true) }
    ).pipe(
      map(result => result.results),
      map(result => result.sort(
        (a, b) => a.popularity && b.popularity ? b.popularity - a.popularity : 0
      )),
      map(result => result.map(tmdbMovie => this.TMDBMovie2Movie(tmdbMovie))),

      catchError(error => {
        this.errorService.showError(error, SEARCH_ERROR_MSG);
        return of([]);
      })
    );
  }

  private TMDBMovie2Movie(tmdbMovie: TMDBMovie): Movie {
    return Object.assign(
      { ...tmdbMovie },
      {
        id: String(tmdbMovie.id),
        poster_path: tmdbMovie.poster_path ? `${environment.tmdbPosterUrl}/${tmdbMovie.poster_path}` : undefined
      },
      tmdbMovie.genres && { genres: tmdbMovie.genres.map(genre => genre.name).slice(0, 2) }
    );
  }

}
