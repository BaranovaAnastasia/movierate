import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IMainListsApiService } from 'src/shared/interfaces';
import { Movie, MoviesList, TMDBMoviesList } from 'src/shared/models';

@Injectable({
  providedIn: 'root'
})
export class MainListsApiService implements IMainListsApiService {

  constructor(private httpClient: HttpClient) { }

  getPopular(): Observable<MoviesList> {
    return this.httpClient.get<TMDBMoviesList>(
      `${environment.tmdbApiUrl}/movie/popular?api_key=${environment.tmdbApiKey}`
    ).pipe(
      map(result => {
        return {
          listName: 'Popular',
          movies: result.results.map(movie =>
            Object.assign(
              { ...movie },
              {
                poster_path: movie.poster_path ? `${environment.tmdbPosterUrl}/${movie.poster_path}` : undefined,
                vote_average: undefined,
                vote_count: undefined
              }
            )
          )
        }
      }),
      map(result => {
        result.movies.map(movie => {
          movie.release_date = new Date(movie.release_date!);
          return movie;
        });

        return result;
      })
    );
  }

  getUpcoming(): Observable<MoviesList> {
    const today = new Date();
    const todayReq = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

    return this.httpClient.get<TMDBMoviesList>(
      `${environment.tmdbApiUrl}/discover/movie?api_key=${environment.tmdbApiKey}&primary_release_date.gte=${todayReq}`
    ).pipe(
      map(result => {
        return {
          listName: 'Coming Soon',
          movies: result.results.map(movie =>
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
      }),
      map(result => {
        result.movies.map(movie => {
          movie.release_date = new Date(movie.release_date!);
          return movie;
        });
        result.movies.sort(
          (a, b) => a.release_date && b.release_date
            ? (new Date(a.release_date)).getTime() - (new Date(b.release_date)).getTime()
            : 0
        );
        return result;
      })
    )
  }

  getTopRated(): Observable<MoviesList> {
    return this.httpClient.get<Movie[]>(
      `${environment.serverUrl}/movie/top`
    ).pipe(
      map(result => {
        return {
          listName: 'Highest Ranked',
          movies: result.map(movie => Object.assign(
            { ...movie },
            { release_date: new Date(movie.release_date!) }
          ))
        }
      })
    )
  }
}
