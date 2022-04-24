import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserApiService, IUserApiServiceToken } from '../interfaces/IUserApiService';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    @Inject(IUserApiServiceToken)
    private userApiService: IUserApiService
  ) { }

  getUserById(id: string): Observable<User> {
    return this.userApiService.getUserById(id);
  }
}
