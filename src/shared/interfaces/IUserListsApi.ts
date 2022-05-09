import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { MoviesList } from '../models/movies-list/movies-list'

export const IUserListsApiServiceToken = new InjectionToken('IUserListsApiService');

export interface IUserListsApiService {
  createList(name: string, isPublic: boolean): Observable<MoviesList>;
  addMovieToList(movieId: string, listId: number): Observable<MoviesList>;
  getList(listId: number): Observable<MoviesList>;
  getAllUserLists(userId: number): Observable<MoviesList[]>;
}