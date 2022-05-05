import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { api_keys } from 'src/environments/api_keys';
import { IReviewsApiService } from 'src/shared/interfaces/IReviewsApiService';
import { Review } from 'src/shared/models/movie/review';
import { TMDBReviews } from 'src/shared/models/tmdb/tmdb-reviews';

const url = 'https://api.themoviedb.org/3/';

@Injectable({
  providedIn: 'root'
})
export class TMDBReviewsApiService implements IReviewsApiService {

  constructor(private httpClient: HttpClient) { }

  getMovieReviews(movieId: string): Observable<Review[]> {
    return this.httpClient.get<TMDBReviews>(
      `${url}movie/${movieId}/reviews?api_key=${api_keys.TMDB_API_KEY}`
    ).pipe(
      map(result =>
        result.results.map(review => Object.assign(
          { ...review },
          {
            author_details: Object.assign(
              { ...review.author_details },
              { avatar_path: review.author_details.avatar_path?.substring(1) }
            )
          }
        ))
      )
    );
  }

  getUserReviews(username: string): Observable<Review[]> {
    throw new Error('Method not implemented.');
  }
}
