import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserActionDto } from 'src/shared/dto';
import { IS_ACCESS_TOKEN_REQURED } from 'src/shared/interceptors';
import { IUserActionApiService } from 'src/shared/interfaces';
import { ErrorService } from '../error.service';
import { constructRequestUrl } from '../functions';
import { USER_ACTIVITY_ERROR_MSG, USER_ACTIVITY_PATH } from './constants';

@Injectable({
  providedIn: 'root'
})
export class UserActionApiService implements IUserActionApiService {

  constructor(
    private httpClient: HttpClient,
    private errorService: ErrorService
  ) { }

  getUserAction$(userId: number): Observable<UserActionDto[] | undefined> {
    return this.httpClient.get<UserActionDto[]>(
      constructRequestUrl(
        environment.serverUrl,
        USER_ACTIVITY_PATH,
        `/${userId}`
      ),
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    ).pipe(
      catchError(error => {
        this.errorService.showError(error, USER_ACTIVITY_ERROR_MSG);
        return of(undefined);
      })
    );
  }
}
