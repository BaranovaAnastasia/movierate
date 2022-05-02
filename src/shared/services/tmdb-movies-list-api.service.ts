import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { api_keys } from 'src/environments/api_keys';
import { IMoviesListApiService } from '../interfaces/IMoviesListApi';
import { MoviesList } from '../models/movies-list/movies-list';
import { TMDBMoviesList } from '../models/tmdb/tmdb-movies-list';

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
          movies: result.results.map(movie => 
            Object.assign(
              {...movie}, 
              {poster_path: `${posterUrl}${movie.poster_path}`})
            )
        }
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
              {...movie}, 
              {poster_path: `${posterUrl}${movie.poster_path}`})
            )
        }
      })
    )
  }

  getNew(): Observable<MoviesList> {
    throw new Error('Method not implemented.');
  }

  getUpcoming(): Observable<MoviesList> {
    return this.httpClient.get<TMDBMoviesList>(
      `${url}movie/upcoming?api_key=${api_keys.TMDB_API_KEY}`
    ).pipe(
      map(result => {
        return {
          id: result.id,
          title: 'Coming Soon',
          movies: result.results.map(movie => 
            Object.assign(
              {...movie}, 
              {
                poster_path: `${posterUrl}${movie.poster_path}`,
                statistics: {
                  vote_average: movie.vote_average,
                  vote_count: movie.vote_count
                }
              }
            )
          )
        }
      })
    )
  }

  getUserLists(userId: string): Observable<MoviesList[]> {
    throw new Error('Method not implemented.');
  }
}
