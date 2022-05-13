import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IS_ACCESS_TOKEN_REQURED, IS_REFRESH_TOKEN_REQURED } from 'src/shared/interceptors';
import { IAuthApiService } from 'src/shared/interfaces';
import { Tokens, User } from 'src/shared/models';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService implements IAuthApiService {

  constructor(private httpClient: HttpClient) { }

  signin$(email: string, password: string): Observable<Tokens> {
    return this.httpClient.post<Tokens>(
      `${environment.serverUrl}/auth/local/signin`,
      { email, password }
    );
  }

  signup$(email: string, name: string, password: string): Observable<Tokens> {
    return this.httpClient.post<Tokens>(
      `${environment.serverUrl}/auth/local/signup`,
      { email, name, password }
    );
  }

  logout$(): Observable<void> {
    return this.httpClient.post<void>(
      `${environment.serverUrl}/auth/logout`, {},
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    );
  }

  refresh$(): Observable<Tokens> {
    return this.httpClient.post<Tokens>(
      `${environment.serverUrl}/auth/refresh`, {},
      { context: new HttpContext().set(IS_REFRESH_TOKEN_REQURED, true) }
    );
  }

  getUser$(): Observable<User> {
    return this.httpClient.post<User>(
      `${environment.serverUrl}/auth/user`, {},
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    );
  }
}
