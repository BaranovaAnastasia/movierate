import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserListsApiService } from 'src/shared/interfaces';
import { MoviesList } from 'src/shared/models';

@Injectable({
  providedIn: 'root'
})
export class ListsApiService implements IUserListsApiService {

  constructor(private httpClient: HttpClient) { }

  createList(name: string, isPublic: boolean): Observable<MoviesList> {
    throw new Error('Method not implemented.');
  }
  addMovieToList(movieId: string, listId: number): Observable<MoviesList> {
    throw new Error('Method not implemented.');
  }
  getList(listId: number): Observable<MoviesList> {
    throw new Error('Method not implemented.');
  }
  getAllUserLists(userId: number): Observable<MoviesList[]> {
    throw new Error('Method not implemented.');
  }
}
