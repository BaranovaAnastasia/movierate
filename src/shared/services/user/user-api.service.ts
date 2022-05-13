import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IS_ACCESS_TOKEN_REQURED } from 'src/shared/interceptors';
import { IUserApiService } from 'src/shared/interfaces';
import { User, UserGenresStats, UserStats, UserTopEntry, UserTopOption } from 'src/shared/models';

@Injectable({
  providedIn: 'root'
})
export class UserApiService implements IUserApiService {

  constructor(private httpClient: HttpClient) { }

  getUserById$(id: number): Observable<User> {
    return this.httpClient.get<User>(
      `${environment.serverUrl}/user/${id}`,
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    );
  }

  getUserStats$(id: number): Observable<UserStats> {
    return this.httpClient.get<UserStats>(
      `${environment.serverUrl}/user/stats/${id}`
    );
  }

  getUserGenresStats$(id: number): Observable<UserGenresStats[]> {
    return this.httpClient.get<UserGenresStats[]>(
      `${environment.serverUrl}/user/genres/${id}`
    );
  }

  getUserTop$(top: UserTopOption, limit: number): Observable<UserTopEntry[]> {
    return this.httpClient.get<UserTopEntry[]>(
      `${environment.serverUrl}/user/top?by=${top}&limit=${limit}`
    );
  }
}
