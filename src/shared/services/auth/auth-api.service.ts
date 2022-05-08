import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthApiService } from 'src/shared/interfaces';
import { Tokens, User } from 'src/shared/models';

const host = 'http://localhost:3000/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService implements IAuthApiService {

  constructor(private httpClient: HttpClient) { }

  signin$(email: string, password: string): Observable<Tokens> {
    return this.httpClient.post<Tokens>(
      `${host}/local/signin`,
      { email, password }
    );
  }

  signup$(email: string, name: string, password: string): Observable<Tokens> {
    return this.httpClient.post<Tokens>(
      `${host}/local/signup`,
      { email, name, password }
    );
  }

  logout$(): Observable<void> {
    return this.httpClient.post<void>(`${host}/logout`, {});
  }

  refresh$(): Observable<Tokens> {
    const token = localStorage.getItem('refresh_token');

    return this.httpClient.post<Tokens>(`${host}/refresh`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  getUser$(): Observable<User> {
    return this.httpClient.post<User>(`${host}/user`, {});
  }
}
