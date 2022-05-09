import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMainListsApiService, IMainListsApiServiceToken, IUserListsApiService, IUserListsApiServiceToken } from 'src/shared/interfaces';
import { MoviesList } from 'src/shared/models';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  constructor(
    @Inject(IMainListsApiServiceToken)
    private mainListApiService: IMainListsApiService,
    @Inject(IUserListsApiServiceToken)
    private userListApiService: IUserListsApiService
  ) { }

  getPopular$(): Observable<MoviesList> {
    return this.mainListApiService.getPopular$();
  }

  getUpcoming$(): Observable<MoviesList> {
    return this.mainListApiService.getUpcoming$();
  }

  getTopRated$(): Observable<MoviesList> {
    return this.mainListApiService.getTopRated$();
  }

  addMovieToFavourites$(movieId: string): Observable<void> {
    return this.userListApiService.addMovieToFavourites$(movieId);
  }

  removeMovieFromFavourites$(movieId: string): Observable<void> {
    return this.userListApiService.removeMovieFromFavourites$(movieId);
  }

  getFavourites$(userId: number): Observable<MoviesList> {
    return this.userListApiService.getFavourites$(userId);
  }

  isFavourite$(movieId: string): Observable<boolean> {
    return this.userListApiService.isFavourite$(movieId);
  }

}
