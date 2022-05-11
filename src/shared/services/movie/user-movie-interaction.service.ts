import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserMovieInteractionApiService, IUserMovieInteractionApiServiceToken } from 'src/shared/interfaces';
import { MovieStats } from 'src/shared/models';

@Injectable({
  providedIn: 'root'
})
export class UserMovieInteractionService {

  constructor(
    @Inject(IUserMovieInteractionApiServiceToken)
    private userMovieInteractionApiService: IUserMovieInteractionApiService,
  ) { }

  rateMovie$(movieId: string, rating: number): Observable<MovieStats> {
    return this.userMovieInteractionApiService.rateMovie$(movieId, rating);
  }
  
  watchMovie$(movieId: string): Observable<MovieStats> {
    return this.userMovieInteractionApiService.watchMovie$(movieId);
  }

  unwatchMovie$(movieId: string): Observable<MovieStats> {
    return this.userMovieInteractionApiService.unwatchMovie$(movieId);
  }

  getRating$(movieId: string): Observable<number> {
    return this.userMovieInteractionApiService.getRating$(movieId);
  }

  getStats$(movieId: string): Observable<MovieStats> {
    return this.userMovieInteractionApiService.getStats$(movieId);
  }
}
