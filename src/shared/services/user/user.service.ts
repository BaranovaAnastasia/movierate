import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserApiService, IUserApiServiceToken } from 'src/shared/interfaces/IUserApiService';
import { User } from 'src/shared/models/user/user';
import { UserGenresStats } from 'src/shared/models/user/user-genre-stats';
import { UserStats } from 'src/shared/models/user/user-stats';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    @Inject(IUserApiServiceToken) private userApiService: IUserApiService
  ) {}

  getUserById(id: number): Observable<User> {
    return this.userApiService.getUserById(id);
  }

  getUserStats(id: number): Observable<UserStats> {
    return this.userApiService.getUserStats(id);
  }

  getUserGenresStats(id: number): Observable<UserGenresStats[]> {
    return this.userApiService.getUserGenresStats(id);
  }
}
