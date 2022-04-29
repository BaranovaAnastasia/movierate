import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { Movie } from "../models/movie/movie";
import { Trailer } from "../models/movie/trailer";
import { Credits } from "../models/movie/credits";

export const IMovieApiServiceToken = new InjectionToken('IMovieApiService');

export interface IMovieApiService {
  getMovie(id: string): Observable<Movie>;
  getTrailer(id: string): Observable<Trailer>;
  getCredits(id: string): Observable<Credits>;
}