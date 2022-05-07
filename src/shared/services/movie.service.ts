import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMovieApiService, IMovieApiServiceToken, IUserMovieInteractionApiService, IUserMovieInteractionApiServiceToken } from '../interfaces';
import { Credits, Movie, MovieStats, Trailer } from '../models';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(
    @Inject(IMovieApiServiceToken)
    private movieApiService: IMovieApiService,

    @Inject(IUserMovieInteractionApiServiceToken)
    private userMovieService: IUserMovieInteractionApiService
  ) { }

  getMovie(id: number): Observable<Movie> {
    return this.movieApiService.getMovie(id);
  }

  getTrailer(id: number): Observable<Trailer | undefined> {
    return this.movieApiService.getTrailer(id);
  }

  getCredits(id: number): Observable<Credits> {
    return this.movieApiService.getCredits(id);
  }

  getStats(id: string): Observable<MovieStats> {
    return this.userMovieService.getStats$(id);
  }

  searchMovies(query: string, page: number = 1): Observable<Movie[]> {
    return this.movieApiService.searchMovies(query, page);
  }
}
