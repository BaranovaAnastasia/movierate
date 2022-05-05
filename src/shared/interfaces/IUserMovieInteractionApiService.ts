import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { MovieStats } from "../models/movie/movie-stats";

export const IUserMovieInteractionApiServiceToken = new InjectionToken('IUserMovieInteractionApiService');

export interface IUserMovieInteractionApiService {
  rateMovie$(movieId: string, rating: number ): Observable<MovieStats>;
  watchMovie$(movieId: string): Observable<MovieStats>;
  isWatched$(movieId: string): Observable<boolean>;
  getStats$(movieId: string): Observable<MovieStats>;
}
