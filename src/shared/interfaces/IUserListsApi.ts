import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { MoviesList } from '../models/movies-list/movies-list'

export const IUserListsApiServiceToken = new InjectionToken('IUserListsApiService');

export interface IUserListsApiService {
  getAllListsCurrent$(): Observable<MoviesList[]>;
  getAllUserLists$(userId: number): Observable<MoviesList[]>;
  getList$(listId: number): Observable<MoviesList>;

  createList$(listName: string, isPublic: boolean): Observable<MoviesList>;
  addMovieToList$(movieId: string, listId: number): Observable<void>;

  editList$(listId: number, listName: string, isPublic: boolean): Observable<void>;
}