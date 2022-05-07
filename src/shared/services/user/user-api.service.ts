import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserGenresStats } from 'src/shared/models/user/user-genre-stats';
import { UserStats } from 'src/shared/models/user/user-stats';
import { UserTopEntry } from 'src/shared/models/user/user-top-entry';
import { UserTopOption } from 'src/shared/models/user/user-top-option';
import { IUserApiService } from '../../interfaces/IUserApiService';
import { User } from '../../models/user/user';

const host = 'http://localhost:3000/user';

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
