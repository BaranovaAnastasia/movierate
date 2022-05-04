import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from 'inspector';
import { Observable } from 'rxjs';
import { IUserMovieInteractionApiService } from '../../interfaces/IUserMovieInteractionApiService';
import { MovieStats } from '../../models/movie/movie-stats';

const host = 'http://localhost:3000/movie';

@Injectable({
  providedIn: 'root'
})
export class UserMovieInteractionApiService implements IUserMovieInteractionApiService {

  constructor(private httpClient: HttpClient) { }
  
  rateMovie$(movieId: number, rating: number): Observable<MovieStats> {
    return this.httpClient.post<MovieStats>(
      `${url}/rate`,
      { movieId, rating }
    )
  }
  
  watchMovie$(movieId: number): Observable<MovieStats> {
    throw new Error('Method not implemented.');
  }

}
