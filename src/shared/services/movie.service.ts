import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMovieApiService, IMovieApiServiceToken } from '../interfaces/IMovieApiService';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(
    @Inject(IMovieApiServiceToken)
    private movieApiService: IMovieApiService
  ) { }

  getMovieById(id: string): Observable<Movie> {
    return this.movieApiService.getMovieById(id);
  }
}
