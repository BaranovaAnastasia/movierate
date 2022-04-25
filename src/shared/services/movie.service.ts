import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMovieApiService, IMovieApiServiceToken, MainListName } from '../interfaces/IMovieApiService';
import { Movie } from '../models/movie';
import { MoviesList } from '../models/movies-list';

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

  getMoviesListById(id: string): Observable<MoviesList> {
    return this.movieApiService.getMoviesListById(id);
  }

  getMainListId(listName: MainListName): Observable<string> {
    return this.movieApiService.getMainListId(listName);
  }
}
