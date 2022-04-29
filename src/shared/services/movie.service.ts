import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMovieApiService, IMovieApiServiceToken } from '../interfaces/IMovieApiService';
import { Credits } from '../models/movie/credits';
import { Movie } from '../models/movie/movie';
import { Trailer } from '../models/movie/trailer';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(
    @Inject(IMovieApiServiceToken)
    private movieApiService: IMovieApiService
  ) { }

  getMovie(id: string): Observable<Movie> {
    return this.movieApiService.getMovie(id);
  }

  getTrailer(id: string): Observable<Trailer> {
    return this.movieApiService.getTrailer(id);
  }

  getCredits(id: string): Observable<Credits> {
    return this.movieApiService.getCredits(id);
  }

  constructFullMovie(id: string, movie: Movie): void {
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
