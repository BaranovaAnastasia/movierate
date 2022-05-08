import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { api_keys } from 'src/environments/api_keys';
import { IMoviesListApiService } from 'src/shared/interfaces';
import { MoviesList, TMDBMoviesList } from 'src/shared/models';

const url = 'https://api.themoviedb.org/3/';
const posterUrl = 'https://image.tmdb.org/t/p/w1280/';

@Injectable({
  providedIn: 'root'
})
export class TMDBMoviesListApiService implements IMoviesListApiService {

  constructor(private httpClient: HttpClient) { }

  getTopRated(): Observable<MoviesList> {
    return this.httpClient.get<TMDBMoviesList>(
      `${url}movie/top_rated?api_key=${api_keys.TMDB_API_KEY}`
    ).pipe(
      map(result => {
        return {
          id: result.id,
          title: 'Top Rated',
          movies: result.results.map(
            movie =>
              Object.assign(
                { ...movie },
                {
                  poster_path: movie.poster_path ? `${posterUrl}${movie.poster_path}` : undefined,
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
    )
  }

  getPopular(): Observable<MoviesList> {
    return this.httpClient.get<TMDBMoviesList>(
      `${url}movie/popular?api_key=${api_keys.TMDB_API_KEY}`
    ).pipe(
      map(result => {
        return {
          id: result.id,
          title: 'Popular',
          movies: result.results.map(movie =>
            Object.assign(
              { ...movie },
              {
                poster_path: movie.poster_path ? `${posterUrl}${movie.poster_path}` : undefined,
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
    )
  }

  getUpcoming(): Observable<MoviesList> {
    const today = new Date();
    const todayReq = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

    return this.httpClient.get<TMDBMoviesList>(
      `https://api.themoviedb.org/3/discover/movie?api_key=${api_keys.TMDB_API_KEY}&primary_release_date.gte=${todayReq}`
    ).pipe(
      map(result => {
        return {
          id: result.id,
          title: 'Coming Soon',
          movies: result.results.map(movie =>
            Object.assign(
              { ...movie },
              {
                poster_path: movie.poster_path ? `${posterUrl}${movie.poster_path}` : undefined,
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

  getUserLists(userId: string): Observable<MoviesList[]> {
    throw new Error('Method not implemented.');
  }
}
