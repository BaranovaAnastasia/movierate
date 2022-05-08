import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserApiService } from 'src/shared/interfaces';
import { User, UserGenresStats, UserStats, UserTopEntry, UserTopOption } from 'src/shared/models';

const host = 'https://git.heroku.com/movierate-backend/user';

@Injectable({
  providedIn: 'root'
})
export class UserApiService implements IUserApiService {

  constructor(private httpClient: HttpClient) { }

  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${host}/${id}`);
  }

  getUserStats(id: number): Observable<UserStats> {
    return this.httpClient.get<UserStats>(`${host}/stats/${id}`);
  }

  getUserGenresStats(id: number): Observable<UserGenresStats[]> {
    return this.httpClient.get<UserGenresStats[]>(`${host}/genres/${id}`);
  }

  getUserTop(top: UserTopOption, limit: number): Observable<UserTopEntry[]> {
    return this.httpClient.get<UserTopEntry[]>(`${host}/top?by=${top}&limit=${limit}`);
  }
}
