import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReviewDto } from 'src/shared/dto';
import { IReviewsApiService, IReviewsApiServiceToken } from 'src/shared/interfaces';
import { Review } from 'src/shared/models';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(
    @Inject(IReviewsApiServiceToken)
    private reviewsApiService: IReviewsApiService
  ) { }

  getMovieReviews$(movieId: string): Observable<Review[]> {
    return this.reviewsApiService.getMovieReviews$(movieId)
      .pipe(
        map(reviews => reviews.map(
          review => this.reviewDto2Review(review)
        ))
      );
  }

  postReview$(movieId: string, review: Review): Observable<Review[]> {
    return this.reviewsApiService.postReview$(movieId, review)
      .pipe(
        map(reviews => reviews.map(
          review => this.reviewDto2Review(review)
        ))
      );
  }

  private reviewDto2Review(dto: ReviewDto): Review {
    return {
      movie_id: dto.movie_id,
      rating: dto.rating,
      title: dto.title,
      review: dto.review,
      created_at: dto.created_at,

      author: {
        id: dto.user_id,
        name: dto.user_name,
        avatar_path: dto.avatar_path,
      }
    }
  }
}
