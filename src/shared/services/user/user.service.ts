import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserApiService, IUserApiServiceToken } from 'src/shared/interfaces';
import { User, UserGenresStats, UserStats, UserTopEntry, UserTopOption } from 'src/shared/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    @Inject(IUserApiServiceToken)
    private userApiService: IUserApiService
  ) {}

  getUserById$(id: number): Observable<User | undefined> {
    return this.userApiService.getUserById$(id);
  }

  getUserStats$(id: number): Observable<UserStats | undefined> {
    return this.userApiService.getUserStats$(id);
  }

  getUserGenresStats$(id: number): Observable<UserGenresStats[]> {
    return this.userApiService.getUserGenresStats$(id);
  }

  getUserTop$(top: UserTopOption, limit: number): Observable<UserTopEntry[]> {
    return this.userApiService.getUserTop$(top, limit);
  }

  follow$(userId: number): Observable<void> {
    return this.userApiService.follow$(userId);
  }

  unfollow$(userId: number): Observable<void> {
    return this.userApiService.unfollow$(userId);
  }

  getFollowing$(userId: number): Observable<User[]> {
    return this.userApiService.getFollowing$(userId);
  }

  getFollowedBy$(userId: number): Observable<User[]> {
    return this.userApiService.getFollowedBy$(userId);
  }
}
