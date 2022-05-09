import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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
    return this.httpClient.post<void>(`${environment.serverUrl}/auth/logout`, {});
  }

  refresh$(): Observable<Tokens> {
    const token = localStorage.getItem('refresh_token');

    return this.httpClient.post<Tokens>(`${environment.serverUrl}/auth/refresh`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  getUser$(): Observable<User> {
    return this.httpClient.post<User>(`${environment.serverUrl}/auth/user`, {});
  }
}
