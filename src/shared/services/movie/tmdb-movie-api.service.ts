import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IS_API_REQUEST } from 'src/shared/interceptors';
import { IMovieApiService } from 'src/shared/interfaces';
import { Credits, Movie, TMDBCredits, TMDBMovie, TMDBSearchResult, TMDBVideos, Trailer } from 'src/shared/models';
import { ErrorService } from '../error.service';

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
      `${environment.tmdbApiUrl}/movie/${id}?api_key=${environment.tmdbApiKey}`,
      { context: new HttpContext().set(IS_API_REQUEST, true) }
    ).pipe(
      map(result => this.TMDBMovie2Movie(result)),

      catchError(error => {
        this.errorService.showError(error, 'Cannot get movie.');
        return of(undefined);
      })
    );
  }

  getTrailer$(id: string): Observable<Trailer | undefined> {
    return this.httpClient.get<TMDBVideos>(
      `${environment.tmdbApiUrl}/movie/${id}/videos?api_key=${environment.tmdbApiKey}`,
      { context: new HttpContext().set(IS_API_REQUEST, true) }
    ).pipe(
      map(result => result.results.find(video => video.type === 'Trailer')),

      catchError(error => {
        this.errorService.showError(error, 'Cannot get trailer.');
        return of(undefined);
      })
    );
  }

  getCredits$(id: string): Observable<Credits | undefined> {
    return this.httpClient.get<TMDBCredits>(
      `${environment.tmdbApiUrl}/movie/${id}/credits?api_key=${environment.tmdbApiKey}`,
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
            .filter(member => member.job === 'Director')
            .map(value => value.name)
        },
        {
          writers: result.crew
            .filter(member => member.department === 'Writing')
            .map(value => value.name)
        }
      )),

      catchError(error => {
        this.errorService.showError(error, 'Cannot get movie credits.');
        return of(undefined);
      })
    );
  }

  searchMovies$(query: string, page: number): Observable<Movie[]> {
    return this.httpClient.get<TMDBSearchResult>(
      `${environment.tmdbApiUrl}/search/movie?api_key=${environment.tmdbApiKey}&query=${query}&page=${page}`,
      { context: new HttpContext().set(IS_API_REQUEST, true) }
    ).pipe(
      map(result => result.results),
      map(result => result.sort(
        (a, b) => a.popularity && b.popularity ? b.popularity - a.popularity : 0
      )),
      map(result => result.map(tmdbMovie => this.TMDBMovie2Movie(tmdbMovie))),

      catchError(error => {
        this.errorService.showError(error, 'An error occurred while searching.');
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
