import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUserListsApiService } from 'src/shared/interfaces';
import { MoviesList } from 'src/shared/models';

const tempUrl = 'http://localhost:8080/lists';

@Injectable({
  providedIn: 'root'
})
export class UserListsApiService implements IUserListsApiService {

  constructor(private httpClient: HttpClient) { }

  createList$(name: string, isPublic: boolean): Observable<MoviesList> {
    throw new Error('Method not implemented.');
  }
  addMovieToList$(movieId: string, listId: number): Observable<MoviesList> {
    throw new Error('Method not implemented.');
  }
  getList$(listId: number): Observable<MoviesList> {
    throw new Error('Method not implemented.');
  }
  getAllUserLists$(userId: number): Observable<MoviesList[]> {
    throw new Error('Method not implemented.');
  }

  addMovieToFavourites$(movieId: string): Observable<void> {
    return this.httpClient.post<void>(
      `${environment.serverUrl}/lists/favourite`,
      { movieId }
    );
  }

  removeMovieFromFavourites$(movieId: string): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.serverUrl}/lists/favourite/${movieId}`
    );
  }
  
  getFavourites$(userId: number): Observable<MoviesList> {
    return this.httpClient.get<MoviesList>(
      `${environment.serverUrl}/lists/favourite/${userId}`
    );
  }
  
  isFavourite$(movieId: string): Observable<boolean> {
    return this.httpClient.get<boolean>(
      `${environment.serverUrl}/lists/isfavourite/${movieId}`
    );
  }

}
