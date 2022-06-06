import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IS_ACCESS_TOKEN_REQURED, IS_REFRESH_TOKEN_REQURED } from 'src/shared/interceptors';
import { IAuthApiService } from 'src/shared/interfaces';
import { Tokens, User } from 'src/shared/models';
import { constructRequestUrl } from '../functions';
import { AUTHORIZED_USER_PATH, LOGOUT_PATH, REFRESH_PATH, SIGNIN_PATH, SIGNUP_PATH } from './constants';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService implements IAuthApiService {

  constructor(private httpClient: HttpClient) { }

  signin$(email: string, password: string): Observable<Tokens> {
    return this.httpClient.post<Tokens>(
      constructRequestUrl(environment.serverUrl, SIGNIN_PATH),
      { email, password }
    );
  }

  signup$(email: string, name: string, password: string): Observable<Tokens> {
    return this.httpClient.post<Tokens>(
      constructRequestUrl(environment.serverUrl, SIGNUP_PATH),
      { email, name, password }
    );
  }

  logout$(): Observable<void> {
    return this.httpClient.post<void>(
      constructRequestUrl(environment.serverUrl, LOGOUT_PATH), {},
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    );
  }

  refresh$(): Observable<Tokens> {
    return this.httpClient.post<Tokens>(
      constructRequestUrl(environment.serverUrl, REFRESH_PATH), {},
      { context: new HttpContext().set(IS_REFRESH_TOKEN_REQURED, true) }
    );
  }

  getUser$(): Observable<User> {
    return this.httpClient.post<User>(
      constructRequestUrl(environment.serverUrl, AUTHORIZED_USER_PATH), {},
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    );
  }
}
