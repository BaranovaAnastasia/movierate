import { HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { catchError, filter, map, mergeMap, tap } from 'rxjs/operators';
import { IAuthApiService, IAuthApiServiceToken } from '../interfaces/IAuthApiService';
import { Tokens } from '../models/tokens';
import { User } from '../models/user/user';
import { NavigationService } from './navigation.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedInUser$ = new Subject<User>()

  constructor(
    @Inject(IAuthApiServiceToken) private authApiService: IAuthApiService,
    private navigationService: NavigationService
  ) { }

  private set loggedInUser(user: User) {
    this.loggedInUser$.next(user);
  }

  initialize() {
    this.authApiService.getUser$()
      .pipe(filter(user => user !== null && user !== undefined))
      .subscribe(
        user => { this.loggedInUser = user; },
        error => {
          if (error.status !== 401) throw error;

          this.refresh()
            .subscribe(
              () => {
                this.authApiService.getUser$().subscribe(
                  user => { this.loggedInUser = user; },
                );
              }
            );
        }
      );
  }

  signin$(email: string, password: string): void {
    this.authApiService.signin$(email, password).subscribe(
      result => {
        this.authApiService.getUser$().subscribe(
          user => {
            this.loggedInUser = user;
          }
        );

        AuthService.refreshTokensInStorage(result);
      }
    );
  }

  signup$(email: string, name: string, password: string): void {
    this.authApiService.signup$(email, name, password).subscribe(
      result => {
        AuthService.refreshTokensInStorage(result);
        this.authApiService.getUser$().subscribe(
          user => { this.loggedInUser = user }
        );
      })
  }

  logout() { }

  private refresh(): Observable<Tokens> {
    return this.authApiService.refresh$().pipe(
      tap(tokens => AuthService.refreshTokensInStorage(tokens))
    )
  }

  private static refreshTokensInStorage(tokens: Tokens) {
    localStorage.setItem('access_token', tokens.access_token);
    localStorage.setItem('refresh_token', tokens.refresh_token);
  }

}
