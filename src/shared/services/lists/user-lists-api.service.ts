import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IS_ACCESS_TOKEN_REQURED } from 'src/shared/interceptors';
import { IUserListsApiService } from 'src/shared/interfaces';
import { MoviesList } from 'src/shared/models';
import { ErrorService } from '../error.service';

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
      `${environment.serverUrl}/lists/all/current`,
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    ).pipe(
      catchError(error => {
        this.errorService.showError(error, 'Cannot get lists.');
        return of([]);
      })
    );
  }

  getAllUserLists$(userId: number): Observable<MoviesList[]> {
    return this.httpClient.get<MoviesList[]>(
      `${environment.serverUrl}/lists/all/${userId}`,
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    ).pipe(
      catchError(error => {
        this.errorService.showError(error, 'Cannot get lists.');
        return of([]);
      })
    );
  }

  getList$(listId: number): Observable<MoviesList | undefined> {
    return this.httpClient.get<MoviesList>(
      `${environment.serverUrl}/lists/${listId}`,
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    ).pipe(
      catchError(error => {
        this.errorService.showError(error, 'Cannot get list.');
        return of(undefined);
      })
    );
  }

  createList$(listName: string, isPublic: boolean): Observable<MoviesList> {
    return this.httpClient.post<MoviesList>(
      `${environment.serverUrl}/lists/create`,
      { listName, isPublic },
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    ).pipe(
      catchError(error => {
        this.errorService.showError(error, 'Cannot create list.');
        return throwError(error);
      })
    );
  }

  addMovieToList$(movieId: string, listId: number): Observable<void> {
    return this.httpClient.post<void>(
      `${environment.serverUrl}/lists/add`,
      { movieId, listId },
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    ).pipe(
      catchError(error => {
        this.errorService.showError(error, 'Cannot add movie to list.');
        return throwError(error);
      })
    );
  }

  editList$(listId: number, listName: string, isPublic: boolean): Observable<void> {
    return this.httpClient.post<void>(
      `${environment.serverUrl}/lists/edit/${listId}`,
      { listName, isPublic },
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    ).pipe(
      catchError(error => {
        this.errorService.showError(error, 'Cannot edit list.');
        return throwError(error);
      })
    );
  }

  removeMovieFromList$(movieId: string, listId: number): Observable<MoviesList | undefined> {
    return this.httpClient.post<MoviesList>(
      `${environment.serverUrl}/lists/remove`,
      { movieId, listId },
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    ).pipe(
      catchError(error => {
        this.errorService.showError(error, 'Cannot remove movie from list.');
        return throwError(error);
      })
    );
  }

  deleteList$(listId: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.serverUrl}/lists/${listId}`,
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    ).pipe(
      catchError(error => {
        this.errorService.showError(error, 'Cannot delete list.');
        return throwError(error);
      })
    );
  }

}
