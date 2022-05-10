import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUserListsApiService } from 'src/shared/interfaces';
import { MoviesList } from 'src/shared/models';

@Injectable({
  providedIn: 'root'
})
export class UserListsApiService implements IUserListsApiService {

  constructor(private httpClient: HttpClient) { }

  getAllListsCurrent$(): Observable<MoviesList[]> {
    return this.httpClient.get<MoviesList[]>(
      `${environment.serverUrl}/lists/all/current`
    );
  }

  getAllUserLists$(userId: number): Observable<MoviesList[]> {
    return this.httpClient.get<MoviesList[]>(
      `${environment.serverUrl}/lists/all/${userId}`
    );
  }

  getList$(listId: number): Observable<MoviesList> {
    return this.httpClient.get<MoviesList>(
      `${environment.serverUrl}/lists/${listId}`
    );
  }

  createList$(listName: string, isPublic: boolean): Observable<MoviesList> {
    return this.httpClient.post<MoviesList>(
      `${environment.serverUrl}/lists/create`,
      { listName, isPublic }
    );
  }

  addMovieToList$(movieId: string, listId: number): Observable<void> {
    return this.httpClient.post<void>(
      `${environment.serverUrl}/lists/add`,
      { movieId, listId }
    );
  }

}
