import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { IMovieApiService } from '../../interfaces/IMovieApiService';
import { Movie } from '../../models/movie/movie';
import { HttpClient } from '@angular/common/http';
import { api_keys } from 'src/environments/api_keys';
import { Trailer } from '../../models/movie/trailer';
import { TMDBVideos } from '../../models/tmdb/tmdb-videos';
import { TMDBCredits } from '../../models/tmdb/tmdb-credits'
import { Credits } from '../../models/movie/credits';
import { TMDBMovie } from '../../models/tmdb/tmdb-movie';
import { TMDBSearchResult } from 'src/shared/models/tmdb/tmdb-search-result';

const url = 'https://api.themoviedb.org/3';
const posterUrl = 'https://image.tmdb.org/t/p/w1280';

@Injectable({
  providedIn: 'root'
})
export class TMDBMovieApiService implements IMovieApiService {

  constructor(private httpClient: HttpClient) { }

  getMovie(id: number): Observable<Movie> {
    return this.httpClient.get<TMDBMovie>(
      `${url}/movie/${id}?api_key=${api_keys.TMDB_API_KEY}`
    ).pipe(
      map(result => this.TMDBMovie2Movie(result))
    );
  }

  getTrailer(id: number): Observable<Trailer> {
    return this.httpClient.get<TMDBVideos>(
      `${url}/movie/${id}/videos?api_key=${api_keys.TMDB_API_KEY}`
    ).pipe(
      map(result => result.results.find(video => video.type === 'Trailer')),
      map(result => Object.assign(
        { ...result },
        { embededUrl: `http://www.youtube.com/embed/${result?.key}` }
      ))
    );
  }

  getCredits(id: number): Observable<Credits> {
    return this.httpClient.get<TMDBCredits>(
      `${url}/movie/${id}/credits?api_key=${api_keys.TMDB_API_KEY}`
    ).pipe(
      map(result => Object.assign(
        {
          cast: result.cast
            .filter(member => member.order < 4)
            .map(value => value.name)
        },
        {
          directors: result.crew
            .filter(member => member.job === 'Director')
            .map(value => value.name)
        },
        {
          writers: result.crew
            .filter(member => member.department === 'Writing')
            .map(value => value.name)
        }
      ))
    );
  }
  
  searchMovies(query: string, page: number): Observable<Movie[]> {
    return this.httpClient.get<TMDBSearchResult>(
      `${url}/search/movie?api_key=${api_keys.TMDB_API_KEY}&query=${query}&page=${page}`
    ).pipe(
      map(result => result.results),
      map(result => result.sort(
        (a, b) => a.popularity && b.popularity ? b.popularity - a.popularity : 0
      )),
      map(result => result.map(tmdbMovie => this.TMDBMovie2Movie(tmdbMovie)))
    );
  }

  private TMDBMovie2Movie(tmdbMovie: TMDBMovie): Movie {
    return Object.assign(
      { ...tmdbMovie },
      { poster_path: `${posterUrl}${tmdbMovie.poster_path}` },
      tmdbMovie.genres && { genres: tmdbMovie.genres.map(genre => genre.name).slice(2) },
      { year: new Date(tmdbMovie.release_date).getFullYear() },
    );
  }

}
