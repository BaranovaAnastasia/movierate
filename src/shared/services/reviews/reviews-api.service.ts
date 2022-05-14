import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IS_ACCESS_TOKEN_REQURED } from 'src/shared/interceptors';
import { IReviewsApiService } from 'src/shared/interfaces';
import { Review } from 'src/shared/models';
import { ErrorService } from '../error.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewsApiService implements IReviewsApiService {

  constructor(
    private httpClient: HttpClient,
    private errorService: ErrorService
  ) { }

  getMovieReviews$(movieId: string): Observable<Review[]> {
    return this.httpClient.get<Review[]>(
      `${environment.serverUrl}/review/${movieId}`,
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    ).pipe(
      catchError(error => {
        this.errorService.showError(error, 'Cannot get reviews.');
        return of([]);
      })
    );
  }

  postReview$(movieId: string, review: Review): Observable<Review[]> {
    return this.httpClient.post<Review[]>(
      `${environment.serverUrl}/review`,
      Object.assign(
        { ...review }, { movie_id: movieId }
      ),
      { context: new HttpContext().set(IS_ACCESS_TOKEN_REQURED, true) }
    ).pipe(
      catchError(error => {
        this.errorService.showError(error, 'Cannot post review.');
        return of([]);
      })
    );
  }

  getUserReviews$(username: string): Observable<Review[]> {
    throw new Error('Method not implemented.');
  }
}
