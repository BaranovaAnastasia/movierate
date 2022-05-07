import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IReviewsApiService } from '../../interfaces/IReviewsApiService';
import { Review } from '../../models/movie/review';

const host = 'http://localhost:3000/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewsApiService implements IReviewsApiService {

  constructor(private httpClient: HttpClient) { }

  getMovieReviews(movieId: string): Observable<Review[]> {
    return this.httpClient.get<Review[]>(`${host}/${movieId}`);
  }

  postReview(movieId: string, review: Review): Observable<Review[]> {
    return this.httpClient.post<Review[]>(
      `${host}`,
      Object.assign(
        {...review}, {movie_id: movieId}
      )
    );
  }

  getUserReviews(username: string): Observable<Review[]> {
    throw new Error('Method not implemented.');
  }
}
