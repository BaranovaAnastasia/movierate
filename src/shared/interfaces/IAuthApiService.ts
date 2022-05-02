import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { Tokens } from "../models/tokens";
import { User } from "../models/user/user";

export const IAuthApiServiceToken = new InjectionToken('IAuthApiService');

export interface IAuthApiService {
  signin$(email: string, password: string): Observable<Tokens>;
  signup$(email: string, name: string, password: string): Observable<Tokens>;

  logout$(): void;
  refresh$(): Observable<Tokens>;
  getUser$(): Observable<User>;
}