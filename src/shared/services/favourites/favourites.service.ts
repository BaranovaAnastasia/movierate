import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IFavouritesApiServiceToken } from 'src/shared/interfaces';
import { MoviesList } from 'src/shared/models';
import { FavouritesApiService } from './favourites-api.service';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {
  constructor(
    @Inject(IFavouritesApiServiceToken) private favouritesApiService: FavouritesApiService
  ) { }

  addMovieToFavourites$(movieId: string): Observable<void> {
    return this.favouritesApiService.addMovieToFavourites$(movieId);
  }

  removeMovieFromFavourites$(movieId: string): Observable<void> {
    return this.favouritesApiService.removeMovieFromFavourites$(movieId);
  }

  getFavourites$(userId: number): Observable<MoviesList> {
    return this.favouritesApiService.getFavourites$(userId)
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

  isFavourite$(movieId: string): Observable<boolean> {
    return this.favouritesApiService.isFavourite$(movieId);
  }
}
