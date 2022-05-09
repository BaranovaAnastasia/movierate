import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { MoviesList } from "../models";

export const IMainListsApiServiceToken = new InjectionToken('IMainListsApiService');

export interface IMainListsApiService {
  getTopRated$(): Observable<MoviesList>;
  getPopular$(): Observable<MoviesList>;
  getUpcoming$(): Observable<MoviesList>;
}