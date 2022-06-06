import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { ReviewDto } from "../dto";
import { Review } from "../models/movie/review";

export const IReviewsApiServiceToken = new InjectionToken('IReviewsApiService');

export interface IReviewsApiService {
  getMovieReviews$(movieId: string): Observable<ReviewDto[]>;
  postReview$(movieId: string, review: Review): Observable<ReviewDto[]>;
  getUserReviews$(username: string): Observable<ReviewDto[]>;
}