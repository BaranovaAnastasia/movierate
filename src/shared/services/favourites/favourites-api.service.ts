import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IFavouritesApiService } from 'src/shared/interfaces';
import { Movie } from 'src/shared/models';

@Injectable({
  providedIn: 'root'
})
export class FavouritesApiService implements IFavouritesApiService {

  constructor(private httpClient: HttpClient) { }

  addMovieToFavourites$(movieId: string): Observable<void> {
    return this.httpClient.post<void>(
      `${environment.serverUrl}/favourites`,
      { movieId }
    );
  }

  removeMovieFromFavourites$(movieId: string): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.serverUrl}/favourites/${movieId}`
    );
  }
  
  getFavourites$(userId: number): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(
      `${environment.serverUrl}/favourites/${userId}`
    );
  }
}
