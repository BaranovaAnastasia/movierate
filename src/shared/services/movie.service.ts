import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  constructFullMovie(id: number, movie: Movie): void {
    this.getMovie(id)
      .subscribe(
        result => {
          Object.assign(movie, result);

          this.getTrailer(id).subscribe(
            trailer => {
              movie.trailer = trailer;
            }
          );

          this.getCredits(id).subscribe(
            credits => { 
              movie.credits = credits;
            }
          )
        }
      )
  }
}
