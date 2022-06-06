import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { UserActionDto } from "../dto";

export const IUserActionApiServiceToken = new InjectionToken('IUserActionApiService');

export interface IUserActionApiService {
  getUserAction$(userId: number): Observable<UserActionDto[] | undefined>;
}