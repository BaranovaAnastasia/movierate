import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IReviewsApiService, IReviewsApiServiceToken } from 'src/shared/interfaces/IReviewsApiService';
import { Review } from 'src/shared/models/movie/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(
    @Inject(IReviewsApiServiceToken)
    private reviewsApiService: IReviewsApiService
  ) { }

  getMovieReviews(movieId: string): Observable<Review[]> {
    return this.reviewsApiService.getMovieReviews(movieId);
  }

  postReview(movieId: string, review: Review): Observable<Review[]> {
    return this.reviewsApiService.postReview(movieId, review);
  }
}
