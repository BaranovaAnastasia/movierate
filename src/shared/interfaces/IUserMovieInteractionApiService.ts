import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { MovieStats } from "../models/movie/movie-stats";

export const IUserMovieInteractionApiServiceToken = new InjectionToken('IUserMovieInteractionApiService');

export interface IUserMovieInteractionApiService {
  rateMovie$(movieId: number, rating: number ): Observable<MovieStats>;
  watchMovie$(movieId: number): Observable<MovieStats>;
}