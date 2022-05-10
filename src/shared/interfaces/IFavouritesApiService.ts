import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { Movie } from "../models";

export const IFavouritesApiServiceToken = new InjectionToken('IFavouritesApiService');

export interface IFavouritesApiService {
  addMovieToFavourites$(movieId: string): Observable<void>;
  removeMovieFromFavourites$(movieId: string): Observable<void>;
  getFavourites$(userId: number): Observable<Movie[]>;
  isFavourite$(movieId: string): Observable<boolean>;
}