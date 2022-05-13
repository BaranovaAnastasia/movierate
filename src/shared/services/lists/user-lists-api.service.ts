import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IS_ACCESS_TOKEN_REQURED } from 'src/shared/interceptors';
import { IUserListsApiService } from 'src/shared/interfaces';
import { MoviesList } from 'src/shared/models';

@Injectable({
  providedIn: 'root'
})
export class UserListsApiService implements IUserListsApiService {

  constructor(private httpClient: HttpClient) { }

  getAllListsCurrent$(): Observable<MoviesList[]> {
    return this.httpClient.get<MoviesList[]>(
      `${environment.serverUrl}/lists/all/current`,
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    );
  }

  getAllUserLists$(userId: number): Observable<MoviesList[]> {
    return this.httpClient.get<MoviesList[]>(
      `${environment.serverUrl}/lists/all/${userId}`,
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    );
  }

  getList$(listId: number): Observable<MoviesList> {
    return this.httpClient.get<MoviesList>(
      `${environment.serverUrl}/lists/${listId}`,
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    );
  }

  createList$(listName: string, isPublic: boolean): Observable<MoviesList> {
    return this.httpClient.post<MoviesList>(
      `${environment.serverUrl}/lists/create`,
      { listName, isPublic },
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    );
  }

  addMovieToList$(movieId: string, listId: number): Observable<void> {
    return this.httpClient.post<void>(
      `${environment.serverUrl}/lists/add`,
      { movieId, listId },
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    );
  }

  editList$(listId: number, listName: string, isPublic: boolean): Observable<void> {
    return this.httpClient.post<void>(
      `${environment.serverUrl}/lists/edit/${listId}`,
      { listName, isPublic },
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    );
  }

  removeMovieFromList$(movieId: string, listId: number): Observable<MoviesList> {
    return this.httpClient.post<MoviesList>(
      `${environment.serverUrl}/lists/remove`,
      { movieId, listId },
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    );
  }

  deleteList$(listId: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.serverUrl}/lists/${listId}`,
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    );
  }

}
