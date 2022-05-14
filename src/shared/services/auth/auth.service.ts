import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { IAuthApiService, IAuthApiServiceToken } from 'src/shared/interfaces';
import { Tokens, User } from 'src/shared/models';
import { NavigationService } from '..';
import { ErrorService } from '../error.service';

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
    if (!localStorage.getItem('access_token')) {
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
        this.errorService.showError(error, 'Cannot sign in.');
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
        this.errorService.showError(error, 'Cannot sign up.');
        return throwError(error);
      })
    );
  }

  logout$(): Observable<void> {
    return this.authApiService.logout$().pipe(
      tap(() => this.logout()),
      catchError(error => {
        this.errorService.showError(error, 'Cannot logout.');
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
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  private static set tokens(tokens: Tokens) {
    localStorage.setItem('access_token', tokens.access_token);
    localStorage.setItem('refresh_token', tokens.refresh_token);
  }

}
