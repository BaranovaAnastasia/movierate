import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { MoviesList } from "../models";

export const IMainListsApiServiceToken = new InjectionToken('IMainListsApiService');

export interface IMainListsApiService {
  getTopRated$(): Observable<MoviesList | undefined>;
  getPopular$(): Observable<MoviesList | undefined>;
  getUpcoming$(): Observable<MoviesList | undefined>;
}