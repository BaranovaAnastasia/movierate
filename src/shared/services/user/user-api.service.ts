import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IS_ACCESS_TOKEN_REQURED } from 'src/shared/interceptors';
import { IUserApiService } from 'src/shared/interfaces';
import { User, UserGenresStats, UserStats, UserTopEntry, UserTopOption } from 'src/shared/models';
import { ErrorService } from '../error.service';
import { constructRequestUrl } from '../functions';
import { FOLLOWED_BY_ERROR_MSG, FOLLOWED_BY_PATH, FOLLOWING_ERROR_MSG, FOLLOWING_PATH, FOLLOW_ERROR_MSG, FOLLOW_PATH, UNFOLLOW_ERROR_MSG, UNFOLLOW_PATH, USER_ERROR_MSG, USER_GENRES_ERROR_MSG, USER_GENRES_PATH, USER_PATH, USER_STATS_ERROR_MSG, USER_STATS_PATH, USER_TOP_ERROR_MSG, USER_TOP_PATH } from './constants';

@Injectable({
  providedIn: 'root'
})
export class UserApiService implements IUserApiService {

  constructor(
    private httpClient: HttpClient,
    private errorService: ErrorService
  ) { }

  getUserById$(id: number): Observable<User | undefined> {
    return this.httpClient.get<User>(
      constructRequestUrl(
        environment.serverUrl,
        USER_PATH,
        `/${id}`
      ),
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    ).pipe(
      catchError(error => {
        this.errorService.showError(error, USER_ERROR_MSG);
        return of(undefined);
      })
    );
  }

  getUserStats$(id: number): Observable<UserStats | undefined> {
    return this.httpClient.get<UserStats>(
      constructRequestUrl(
        environment.serverUrl,
        USER_STATS_PATH,
        `/${id}`
      ),
    ).pipe(
      catchError(error => {
        this.errorService.showError(error, USER_STATS_ERROR_MSG);
        return of(undefined);
      })
    );
  }

  getUserGenresStats$(id: number): Observable<UserGenresStats[]> {
    return this.httpClient.get<UserGenresStats[]>(
      constructRequestUrl(
        environment.serverUrl,
        USER_GENRES_PATH,
        `/${id}`
      ),
    ).pipe(
      catchError(error => {
        this.errorService.showError(error, USER_GENRES_ERROR_MSG);
        return of([]);
      })
    );
  }

  getUserTop$(top: UserTopOption, limit: number): Observable<UserTopEntry[]> {
    return this.httpClient.get<UserTopEntry[]>(
      constructRequestUrl(
        environment.serverUrl,
        USER_TOP_PATH,
        undefined,
        {
          'by': top,
          'limit': limit
        }
      ),
    ).pipe(
      catchError(error => {
        this.errorService.showError(error, USER_TOP_ERROR_MSG);
        return of([]);
      })
    );
  }



  follow$(userId: number): Observable<void> {
    return this.httpClient.post<void>(
      constructRequestUrl(
        environment.serverUrl,
        FOLLOW_PATH,
        `/${userId}`
      ), {},
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    ).pipe(
      catchError(error => {
        this.errorService.showError(error, FOLLOW_ERROR_MSG);
        return throwError(error);
      })
    );
  }

  unfollow$(userId: number): Observable<void> {
    return this.httpClient.post<void>(
      constructRequestUrl(
        environment.serverUrl,
        UNFOLLOW_PATH,
        `/${userId}`
      ), {},
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    ).pipe(
      catchError(error => {
        this.errorService.showError(error, UNFOLLOW_ERROR_MSG);
        return throwError(error);
      })
    );
  }

  getFollowing$(userId: number): Observable<User[]> {
    return this.httpClient.get<User[]>(
      constructRequestUrl(
        environment.serverUrl,
        FOLLOWING_PATH,
        `/${userId}`
      )
    ).pipe(
      catchError(error => {
        this.errorService.showError(error, FOLLOWING_ERROR_MSG);
        return of([]);
      })
    );
  }

  getFollowedBy$(userId: number): Observable<User[]> {
    return this.httpClient.get<User[]>(
      constructRequestUrl(
        environment.serverUrl,
        FOLLOWED_BY_PATH,
        `/${userId}`
      )
    ).pipe(
      catchError(error => {
        this.errorService.showError(error, FOLLOWED_BY_ERROR_MSG);
        return of([]);
      })
    );
  }
}
