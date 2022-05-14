import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IS_ACCESS_TOKEN_REQURED } from 'src/shared/interceptors';
import { IUserListsApiService } from 'src/shared/interfaces';
import { MoviesList } from 'src/shared/models';
import { ErrorService } from '../error.service';
import { constructRequestUrl } from '../functions';
import { ADD_TO_LIST_ERROR_MSG, ADD_TO_LIST_PATH, CREATE_LIST_ERROR_MSG, CREATE_LIST_URL, CURRENT_LISTS_PATH, DELETE_LIST_ERROR_MSG, EDIT_LIST_ERROR_MSG, EDIT_LIST_PATH, LISTS_ERROR_MSG, LIST_ERROR_MSG, LIST_PATH, LIST_URL, REMOVE_FROM_LIST_ERROR_MSG, REMOVE_FROM_LIST_PATH, USER_LISTS_URL } from './constants';

@Injectable({
  providedIn: 'root'
})
export class UserListsApiService implements IUserListsApiService {

  constructor(
    private httpClient: HttpClient,
    private errorService: ErrorService
  ) { }

  getAllListsCurrent$(): Observable<MoviesList[]> {
    return this.httpClient.get<MoviesList[]>(
      constructRequestUrl(
        environment.serverUrl,
        CURRENT_LISTS_PATH
      ),
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    ).pipe(
      catchError(error => {
        this.errorService.showError(error, LISTS_ERROR_MSG);
        return of([]);
      })
    );
  }

  getAllUserLists$(userId: number): Observable<MoviesList[]> {
    return this.httpClient.get<MoviesList[]>(
      constructRequestUrl(
        environment.serverUrl,
        USER_LISTS_URL,
        `/${userId}`
      ),
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    ).pipe(
      catchError(error => {
        this.errorService.showError(error, LISTS_ERROR_MSG);
        return of([]);
      })
    );
  }

  getList$(listId: number): Observable<MoviesList | undefined> {
    return this.httpClient.get<MoviesList>(
      constructRequestUrl(
        environment.serverUrl,
        LIST_URL,
        `/${listId}`
      ),
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    ).pipe(
      catchError(error => {
        this.errorService.showError(error, LIST_ERROR_MSG);
        return of(undefined);
      })
    );
  }

  createList$(listName: string, isPublic: boolean): Observable<MoviesList> {
    return this.httpClient.post<MoviesList>(
      constructRequestUrl(
        environment.serverUrl,
        CREATE_LIST_URL
      ),
      { listName, isPublic },
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    ).pipe(
      catchError(error => {
        this.errorService.showError(error, CREATE_LIST_ERROR_MSG);
        return throwError(error);
      })
    );
  }

  addMovieToList$(movieId: string, listId: number): Observable<void> {
    return this.httpClient.post<void>(
      constructRequestUrl(
        environment.serverUrl,
        ADD_TO_LIST_PATH
      ),
      { movieId, listId },
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    ).pipe(
      catchError(error => {
        this.errorService.showError(error, ADD_TO_LIST_ERROR_MSG);
        return throwError(error);
      })
    );
  }

  editList$(listId: number, listName: string, isPublic: boolean): Observable<void> {
    return this.httpClient.post<void>(
      constructRequestUrl(
        environment.serverUrl,
        EDIT_LIST_PATH,
        `/${listId}`
      ),
      { listName, isPublic },
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    ).pipe(
      catchError(error => {
        this.errorService.showError(error, EDIT_LIST_ERROR_MSG);
        return throwError(error);
      })
    );
  }

  removeMovieFromList$(movieId: string, listId: number): Observable<MoviesList | undefined> {
    return this.httpClient.post<MoviesList>(
      constructRequestUrl(
        environment.serverUrl,
        REMOVE_FROM_LIST_PATH
      ),
      { movieId, listId },
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    ).pipe(
      catchError(error => {
        this.errorService.showError(error, REMOVE_FROM_LIST_ERROR_MSG);
        return throwError(error);
      })
    );
  }

  deleteList$(listId: number): Observable<void> {
    return this.httpClient.delete<void>(
      constructRequestUrl(
        environment.serverUrl,
        LIST_PATH,
        `/${listId}`
      ),
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    ).pipe(
      catchError(error => {
        this.errorService.showError(error, DELETE_LIST_ERROR_MSG);
        return throwError(error);
      })
    );
  }

}
