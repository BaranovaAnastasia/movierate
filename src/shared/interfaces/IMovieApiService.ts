import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { Movie } from "../models/movie";
import { MoviesList } from "../models/movies-list";

export const IMovieApiServiceToken = new InjectionToken('IMovieApiService');

export type MainListName = 'ranked' | 'popular' | 'new';

export interface IMovieApiService {
  getMovieById(id: string): Observable<Movie>;
  getMoviesListById(id: string): Observable<MoviesList>;

  getMainListId(listName: MainListName): Observable<string>;
}