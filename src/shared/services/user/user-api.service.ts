import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IS_ACCESS_TOKEN_REQURED } from 'src/shared/interceptors';
import { IUserApiService } from 'src/shared/interfaces';
import { User, UserGenresStats, UserStats, UserTopEntry, UserTopOption } from 'src/shared/models';
import { ErrorService } from '../error.service';

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
      `${environment.serverUrl}/user/${id}`,
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    ).pipe(
      catchError(error => {
        this.errorService.showError(error, 'Cannot get user.');
        return of(undefined);
      })
    );
  }

  getUserStats$(id: number): Observable<UserStats | undefined> {
    return this.httpClient.get<UserStats>(
      `${environment.serverUrl}/user/stats/${id}`
    ).pipe(
      catchError(error => {
        this.errorService.showError(error, 'Cannot get user statistics.');
        return of(undefined);
      })
    );
  }

  getUserGenresStats$(id: number): Observable<UserGenresStats[]> {
    return this.httpClient.get<UserGenresStats[]>(
      `${environment.serverUrl}/user/genres/${id}`
    ).pipe(
      catchError(error => {
        this.errorService.showError(error, 'Cannot get user statistics.');
        return of([]);
      })
    );
  }

  getUserTop$(top: UserTopOption, limit: number): Observable<UserTopEntry[]> {
    return this.httpClient.get<UserTopEntry[]>(
      `${environment.serverUrl}/user/top?by=${top}&limit=${limit}`
    ).pipe(
      catchError(error => {
        this.errorService.showError(error, 'Cannot get user top.');
        return of([]);
      })
    );
  }
}
