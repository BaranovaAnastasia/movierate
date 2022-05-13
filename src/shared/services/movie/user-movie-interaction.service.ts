import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUserMovieInteractionApiService, IUserMovieInteractionApiServiceToken } from 'src/shared/interfaces';
import { MoviesList, MovieStats } from 'src/shared/models';

@Injectable({
  providedIn: 'root'
})
export class UserMovieInteractionService {

  constructor(
    @Inject(IUserMovieInteractionApiServiceToken)
    private userMovieInteractionApiService: IUserMovieInteractionApiService,
  ) { }

  getRating$(movieId: string): Observable<number> {
    return this.userMovieInteractionApiService.getRating$(movieId);
  }

  getStats$(movieId: string): Observable<MovieStats> {
    return this.userMovieInteractionApiService.getStats$(movieId);
  }

  rateMovie$(movieId: string, rating: number): Observable<MovieStats> {
    return this.userMovieInteractionApiService.rateMovie$(movieId, rating);
  }
  
  watchMovie$(movieId: string): Observable<MovieStats> {
    return this.userMovieInteractionApiService.watchMovie$(movieId);
  }

  unwatchMovie$(movieId: string): Observable<MovieStats> {
    return this.userMovieInteractionApiService.unwatchMovie$(movieId);
  }

  addMovieToFavourites$(movieId: string): Observable<MovieStats> {
    return this.userMovieInteractionApiService.addMovieToFavourites$(movieId);
  }

  removeMovieFromFavourites$(movieId: string): Observable<MovieStats> {
    return this.userMovieInteractionApiService.removeMovieFromFavourites$(movieId);
  }

  getFavourites$(userId: number): Observable<MoviesList> {
    return this.userMovieInteractionApiService.getFavourites$(userId)
      .pipe(
        map(result => {
          return {
            userId: userId,
            listName: 'Favourites',
            movies: result
          }
        })
      );
  }
}
