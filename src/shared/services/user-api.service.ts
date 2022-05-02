import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserApiService } from '../interfaces/IUserApiService';
import { User } from '../models/user/user';

const host = 'http://localhost:3000/user';

@Injectable({
  providedIn: 'root'
})
export class UserApiService implements IUserApiService {

  constructor(private httpClient: HttpClient) { }
  
  getUserById(id: string): Observable<User> {
    return this.httpClient.get<User>(`${host}/${id}`);
  }
}
