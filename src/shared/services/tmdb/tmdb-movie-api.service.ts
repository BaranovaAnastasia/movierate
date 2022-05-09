import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IMovieApiService } from 'src/shared/interfaces';
import { Credits, Movie, TMDBCredits, TMDBMovie, TMDBSearchResult, TMDBVideos, Trailer } from 'src/shared/models';

@Injectable({
  providedIn: 'root'
})
export class TMDBMovieApiService implements IMovieApiService {

  constructor(private httpClient: HttpClient) { }

  getMovie(id: number): Observable<Movie> {
    return this.httpClient.get<TMDBMovie>(
      `${environment.tmdbApiUrl}/movie/${id}?api_key=${environment.tmdbApiKey}`
    ).pipe(
      map(result => this.TMDBMovie2Movie(result))
    );
  }

  getTrailer(id: number): Observable<Trailer | undefined> {
    return this.httpClient.get<TMDBVideos>(
      `${environment.tmdbApiUrl}/movie/${id}/videos?api_key=${environment.tmdbApiKey}`
    ).pipe(
      map(result => result.results.find(video => video.type === 'Trailer'))
    );
  }

  getCredits(id: number): Observable<Credits> {
    return this.httpClient.get<TMDBCredits>(
      `${environment.tmdbApiUrl}/movie/${id}/credits?api_key=${environment.tmdbApiKey}`
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
      `${environment.tmdbApiUrl}/search/movie?api_key=${environment.tmdbApiKey}&query=${query}&page=${page}`
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
      { poster_path: tmdbMovie.poster_path ? `${environment.tmdbPosterUrl}/${tmdbMovie.poster_path}` : undefined },
      { release_date: new Date(tmdbMovie.release_date) },
      tmdbMovie.genres && { genres: tmdbMovie.genres.map(genre => genre.name).slice(0, 2) }
    );
  }

}
