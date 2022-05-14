import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { Movie } from "../models";
import { MovieStats } from "../models/movie/movie-stats";

export const IUserMovieInteractionApiServiceToken = new InjectionToken('IUserMovieInteractionApiService');

export interface IUserMovieInteractionApiService {
  getRating$(movieId: string): Observable<number | undefined>;
  getStats$(movieId: string): Observable<MovieStats | undefined>;

  rateMovie$(movieId: string, rating: number ): Observable<MovieStats>;
  watchMovie$(movieId: string): Observable<MovieStats>;
  unwatchMovie$(movieId: string): Observable<MovieStats>;
  
  addMovieToFavourites$(movieId: string): Observable<MovieStats>;
  removeMovieFromFavourites$(movieId: string): Observable<MovieStats>;
  getFavourites$(userId: number): Observable<Movie[]>;
}
