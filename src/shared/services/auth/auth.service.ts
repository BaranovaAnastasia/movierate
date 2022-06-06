import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'src/shared/constants';
import { IAuthApiService, IAuthApiServiceToken } from 'src/shared/interfaces';
import { Tokens, User } from 'src/shared/models';
import { NavigationService } from '..';
import { ErrorService } from '../error.service';
import { LOGOUT_ERROR_MSG, SIGIN_ERROR_MSG, SIGNUP_ERROR_MSG } from './constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedInUser$ = new BehaviorSubject<User | null | undefined>(undefined)

  constructor(
    @Inject(IAuthApiServiceToken) private authApiService: IAuthApiService,
    private navigationService: NavigationService,
    private errorService: ErrorService
  ) { }

  private set loggedInUser(user: User | null | undefined) {
    this.loggedInUser$.next(user);
  }

  get isLoggedIn(): boolean {
    return this.loggedInUser$.value !== null && this.loggedInUser$.value !== undefined
  }

  initialize() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      this.loggedInUser = null;
      return;
    }

    this.authApiService.getUser$()
      .subscribe(
        user => this.loggedInUser = user,
        () => this.loggedInUser = null
      );
  }

  signin$(email: string, password: string): Observable<void> {
    return this.authApiService.signin$(email, password).pipe(
      tap(result => AuthService.tokens = result),
      concatMap(() => this.authApiService.getUser$()),
      tap(user => {
        this.loggedInUser = user;
        this.navigationService.toMain();
      }),
      map(() => { }),

      catchError(error => {
        this.errorService.showError(error, SIGIN_ERROR_MSG);
        return throwError(error);
      })
    );
  }

  signup$(email: string, name: string, password: string): Observable<void> {
    return this.authApiService.signup$(email, name, password).pipe(
      tap(result => AuthService.tokens = result),
      concatMap(() => this.authApiService.getUser$()),
      tap(user => {
        this.loggedInUser = user;
        this.navigationService.toMain();
      }),
      map(() => { }),

      catchError(error => {
        this.errorService.showError(error, SIGNUP_ERROR_MSG);
        return throwError(error);
      })
    );
  }

  logout$(): Observable<void> {
    return this.authApiService.logout$().pipe(
      tap(() => this.logout()),
      catchError(error => {
        this.errorService.showError(error, LOGOUT_ERROR_MSG);
        return of(void 0);
      })
    );
  }

  refresh$(): Observable<Tokens | undefined> {
    return this.authApiService.refresh$().pipe(
      tap(tokens => AuthService.tokens = tokens),
      catchError(() => of(undefined))
    )
  }

  toSignInIfNotAuthorized(): boolean {
    const isLoggedIn = this.isLoggedIn;
    if (!isLoggedIn) {
      this.navigationService.toSignIn();
    }
    return isLoggedIn;
  }

  private logout(): void {
    this.loggedInUser = null;
    this.navigationService.toMain();
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
  }

  private static set tokens(tokens: Tokens) {
    localStorage.setItem(ACCESS_TOKEN, tokens.access_token);
    localStorage.setItem(REFRESH_TOKEN, tokens.refresh_token);
  }

}
