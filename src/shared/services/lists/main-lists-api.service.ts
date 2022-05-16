import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IS_API_REQUEST } from 'src/shared/interceptors';
import { IMainListsApiService } from 'src/shared/interfaces';
import { Movie, MoviesList } from 'src/shared/models';
import { ErrorService } from '../error.service';
import { constructRequestUrl } from '../functions';
import { POPULAR_ERROR_MSG, POPULAR_PATH, POPULAR_TITLE, TOP_ERROR_MSG, TOP_PATH, TOP_TITLE, UPCOMING_ERROR_MSG, UPCOMING_PATH, UPCOMING_TITLE } from './constants';

@Injectable({
  providedIn: 'root'
})
export class MainListsApiService implements IMainListsApiService {

  constructor(
    private httpClient: HttpClient,
    private errorService: ErrorService
  ) { }

  getPopular$(): Observable<MoviesList | undefined> {
    return this.httpClient.get<Movie[]>(
      constructRequestUrl(
        environment.serverUrl,
        POPULAR_PATH
      ),
      { context: new HttpContext().set(IS_API_REQUEST, true) }
    ).pipe(
      map(result => this.tmdbList2List(result, POPULAR_TITLE)),

      catchError(error => {
        this.errorService.showError(error, POPULAR_ERROR_MSG);
        return of(undefined);
      })
    );
  }

  getUpcoming$(): Observable<MoviesList | undefined> {
    const today = new Date();
    const todayReq = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

    return this.httpClient.get<Movie[]>(
      constructRequestUrl(
        environment.serverUrl,
        UPCOMING_PATH
      ),
      { context: new HttpContext().set(IS_API_REQUEST, true) }
    ).pipe(
      map(result => this.tmdbList2List(result, UPCOMING_TITLE)),
      map(result => this.sortMoviesByDate(result)),

      catchError(error => {
        this.errorService.showError(error, UPCOMING_ERROR_MSG);
        return of(undefined);
      })
    )
  }

  getTopRated$(): Observable<MoviesList | undefined> {
    return this.httpClient.get<Movie[]>(
      constructRequestUrl(
        environment.serverUrl,
        TOP_PATH
      )
    ).pipe(
      map(result => this.getList(TOP_TITLE, result)),

      catchError(error => {
        this.errorService.showError(error, TOP_ERROR_MSG);
        return of(undefined);
      })
    )
  }

  private tmdbList2List(movies: Movie[], listName: string): MoviesList {
    return {
      listName: listName,
      movies: movies.map(movie => Object.assign(
        { ...movie },
        {
          vote_average: undefined,
          vote_count: undefined,
          watched: undefined
        }
      ))
    }
  }

  private sortMoviesByDate(list: MoviesList): MoviesList {
    list.movies!.sort(
      (a, b) => a.release_date && b.release_date
        ? (new Date(a.release_date)).getTime() - (new Date(b.release_date)).getTime()
        : 0
    );
    return list;
  }

  private getList(listName: string, movies: Movie[] = []): MoviesList {
    return {
      listName: listName,
      movies: movies
    };
  }
}
