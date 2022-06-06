import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { Movie } from "../models";
import { MovieStats } from "../models/movie/movie-stats";

export const IUserMovieInteractionApiServiceToken = new InjectionToken('IUserMovieInteractionApiService');

export interface IUserMovieInteractionApiService {
  getRating$(movieId: string): Observable<number | undefined>;
  getStats$(movieId: string): Observable<MovieStats | undefined>;

  rateMovie$(movieId: string, rating: number ): Observable<MovieStats | undefined>;
  watchMovie$(movieId: string): Observable<MovieStats | undefined>;
  unwatchMovie$(movieId: string): Observable<MovieStats | undefined>;
  getWatched$(userId: number): Observable<Movie[]>;
  
  addMovieToFavourites$(movieId: string): Observable<MovieStats | undefined>;
  removeMovieFromFavourites$(movieId: string): Observable<MovieStats | undefined>;
  getFavourites$(userId: number): Observable<Movie[]>;
}
