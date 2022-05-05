import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { Movie } from "../models/movie/movie";
import { Trailer } from "../models/movie/trailer";
import { Credits } from "../models/movie/credits";

export const IMovieApiServiceToken = new InjectionToken('IMovieApiService');

export interface IMovieApiService {
  getMovie(id: number): Observable<Movie>;
  getTrailer(id: number): Observable<Trailer>;
  getCredits(id: number): Observable<Credits>;
}