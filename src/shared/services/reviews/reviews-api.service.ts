import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ReviewDto } from 'src/shared/dto';
import { IS_ACCESS_TOKEN_REQURED } from 'src/shared/interceptors';
import { IReviewsApiService } from 'src/shared/interfaces';
import { Review } from 'src/shared/models';
import { ErrorService } from '../error.service';
import { constructRequestUrl } from '../functions';
import { GET_REVIEWS_ERROR_MSG, POST_REVIEW_ERROR_MSG, REVIEW_PATH } from './constants';

@Injectable({
  providedIn: 'root'
})
export class ReviewsApiService implements IReviewsApiService {

  constructor(
    private httpClient: HttpClient,
    private errorService: ErrorService
  ) { }

  getMovieReviews$(movieId: string): Observable<ReviewDto[]> {
    return this.httpClient.get<ReviewDto[]>(
      constructRequestUrl(
        environment.serverUrl,
        REVIEW_PATH,
        `/${movieId}`
      ),
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    ).pipe(
      catchError(error => {
        this.errorService.showError(error, GET_REVIEWS_ERROR_MSG);
        return of([]);
      })
    );
  }

  postReview$(movieId: string, review: Review): Observable<ReviewDto[]> {
    return this.httpClient.post<ReviewDto[]>(
      constructRequestUrl(
        environment.serverUrl,
        REVIEW_PATH
      ),
      Object.assign(
        { ...review }, { movie_id: movieId }
      ),
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    ).pipe(
      catchError(error => {
        this.errorService.showError(error, POST_REVIEW_ERROR_MSG);
        return of([]);
      })
    );
  }

  getUserReviews$(username: string): Observable<ReviewDto[]> {
    throw new Error('Method not implemented.');
  }
}
