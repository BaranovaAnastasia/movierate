import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { MoviesList } from '../models/movies-list/movies-list'

export const IMoviesListApiServiceToken = new InjectionToken('IMoviesListApiService');

export interface IMoviesListApiService {
  getTopRated(): Observable<MoviesList>;
  getPopular(): Observable<MoviesList>;
  getUpcoming(): Observable<MoviesList>;
  getUserLists(userId: string): Observable<MoviesList[]>;
}