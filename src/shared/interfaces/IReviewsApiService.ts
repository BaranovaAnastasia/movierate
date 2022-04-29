import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { Review } from "../models/movie/review";

export const IReviewsApiServiceToken = new InjectionToken('IReviewsApiService');

export interface IReviewsApiService {
  getMovieReviews(movieId: string): Observable<Review[]>;
  getUserReviews(username: string): Observable<Review[]>;
}