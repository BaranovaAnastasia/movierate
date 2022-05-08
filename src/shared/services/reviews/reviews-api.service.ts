import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IReviewsApiService } from 'src/shared/interfaces';
import { Review } from 'src/shared/models';

const host = 'https://git.heroku.com/movierate-backend/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewsApiService implements IReviewsApiService {

  constructor(private httpClient: HttpClient) { }

  getMovieReviews(movieId: string): Observable<Review[]> {
    return this.httpClient.get<Review[]>(`${host}/${movieId}`)
      .pipe(
        map(reviews => reviews.map(review => Object.assign(
            { ...review },
            { created_at: new Date(review.created_at) }
          )))
      );
  }

  postReview(movieId: string, review: Review): Observable<Review[]> {
    return this.httpClient.post<Review[]>(
      `${host}`,
      Object.assign(
        { ...review }, { movie_id: movieId }
      )
    );
  }

  getUserReviews(username: string): Observable<Review[]> {
    throw new Error('Method not implemented.');
  }
}
