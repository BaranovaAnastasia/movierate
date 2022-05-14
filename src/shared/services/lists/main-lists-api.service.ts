import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IS_API_REQUEST } from 'src/shared/interceptors';
import { IMainListsApiService } from 'src/shared/interfaces';
import { Movie, MoviesList, TMDBMoviesList } from 'src/shared/models';
import { ErrorService } from '../error.service';

@Injectable({
  providedIn: 'root'
})
export class MainListsApiService implements IMainListsApiService {

  constructor(
    private httpClient: HttpClient,
    private errorService: ErrorService
  ) { }

  getPopular$(): Observable<MoviesList | undefined> {
    return this.httpClient.get<TMDBMoviesList>(
      `${environment.tmdbApiUrl}/movie/popular?api_key=${environment.tmdbApiKey}`,
      { context: new HttpContext().set(IS_API_REQUEST, true) }
    ).pipe(
      map(result => this.tmdbList2List(result, 'Popular')),

      catchError(error => {
        this.errorService.showError(error, 'Cannot get popular movies.');
        return of(undefined);
      })
    );
  }

  getUpcoming$(): Observable<MoviesList | undefined> {
    const today = new Date();
    const todayReq = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

    return this.httpClient.get<TMDBMoviesList>(
      `${environment.tmdbApiUrl}/discover/movie?api_key=${environment.tmdbApiKey}&primary_release_date.gte=${todayReq}`,
      { context: new HttpContext().set(IS_API_REQUEST, true) }
    ).pipe(
      map(result => this.tmdbList2List(result, 'Coming Soon')),
      map(result => this.sortMoviesByDate(result)),

      catchError(error => {
        this.errorService.showError(error, 'Cannot get upcoming movies.');
        return of(undefined);
      })
    )
  }

  getTopRated$(): Observable<MoviesList | undefined> {
    return this.httpClient.get<Movie[]>(
      `${environment.serverUrl}/movie/top`
    ).pipe(
      map(result => this.getList('Highest Ranked', result)),

      catchError(error => {
        this.errorService.showError(error, 'Cannot get top rated movies.');
        return of(undefined);
      })
    )
  }

  private tmdbList2List(tmdbList: TMDBMoviesList, listName: string): MoviesList {
    return {
      listName: listName,
      movies: tmdbList.results.map(movie =>
        Object.assign(
          { ...movie },
          {
            poster_path: movie.poster_path ? `${environment.tmdbPosterUrl}${movie.poster_path}` : undefined,
            vote_average: undefined,
            vote_count: undefined
          }
        )
      )
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
