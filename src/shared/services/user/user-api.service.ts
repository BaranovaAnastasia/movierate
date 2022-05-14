import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IS_ACCESS_TOKEN_REQURED } from 'src/shared/interceptors';
import { IUserApiService } from 'src/shared/interfaces';
import { User, UserGenresStats, UserStats, UserTopEntry, UserTopOption } from 'src/shared/models';
import { ErrorService } from '../error.service';
import { constructRequestUrl } from '../functions';
import { USER_ERROR_MSG, USER_GENRES_ERROR_MSG, USER_GENRES_PATH, USER_PATH, USER_STATS_ERROR_MSG, USER_STATS_PATH, USER_TOP_ERROR_MSG, USER_TOP_PATH } from './constants';

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
}
