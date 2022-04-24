import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user";

export const IUserApiServiceToken = new InjectionToken('IUserApiService');

export interface IUserApiService {
  getUserById(id: string): Observable<User>;
}