import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user/user";
import { UserGenresStats } from "../models/user/user-genre-stats";
import { UserStats } from "../models/user/user-stats";

export const IUserApiServiceToken = new InjectionToken('IUserApiService');

export interface IUserApiService {
  getUserById(id: number): Observable<User>;
  getUserStats(id: number): Observable<UserStats>;
  getUserGenresStats(id: number): Observable<UserGenresStats[]>;
}