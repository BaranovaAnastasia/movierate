import { Inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IMovieApiService, IMovieApiServiceToken } from '../interfaces/IMovieApiService';
import { IUserMovieInteractionApiService, IUserMovieInteractionApiServiceToken } from '../interfaces/IUserMovieInteractionApiService';
import { Credits } from '../models/movie/credits';
import { Movie } from '../models/movie/movie';
import { MovieStats } from '../models/movie/movie-stats';
import { Trailer } from '../models/movie/trailer';

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

  getTrailer(id: number): Observable<Trailer> {
    return this.movieApiService.getTrailer(id);
  }

  getCredits(id: number): Observable<Credits> {
    return this.movieApiService.getCredits(id);
  }

  getStats(id: string): Observable<MovieStats> {
    return this.userMovieService.getStats$(id);
  }

  constructFullMovie(id: number, movieSubject: Subject<Movie>): void {
    this.getMovie(id).subscribe(
      async result => {
        const movie = { ...result };

        movie.trailer = await this.getTrailer(id).toPromise();
        movie.credits = await this.getCredits(id).toPromise();

        movieSubject.next(movie);
      }
    );
  }

  searchMovies(query: string, page: number = 1): Observable<Movie[]> {
    return this.movieApiService.searchMovies(query, page);
  }
}
