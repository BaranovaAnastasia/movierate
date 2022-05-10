import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IAuthApiService, IAuthApiServiceToken } from 'src/shared/interfaces';
import { Tokens, User } from 'src/shared/models';
import { NavigationService } from '..';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedInUser$ = new BehaviorSubject<User | null | undefined>(undefined)

  constructor(
    @Inject(IAuthApiServiceToken) private authApiService: IAuthApiService,
    private navigationService: NavigationService
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
      tap(result => {
        AuthService.tokens = result;

        this.authApiService.getUser$().subscribe(
          user => {
            this.loggedInUser = user;
            this.navigationService.toMain();
          }
        );
      }),
      map(() => { })
    );
  }

  signup$(email: string, name: string, password: string): Observable<void> {
    return this.authApiService.signup$(email, name, password).pipe(
      tap(result => {
        AuthService.tokens = result;
        this.authApiService.getUser$().subscribe(
          user => {
            this.loggedInUser = user;
            this.navigationService.toMain();
          }
        );
      }),
      map(() => { })
    )
  }

  logout$(): Observable<void> {
    return this.authApiService.logout$().pipe(
      tap(() => {
        this.loggedInUser = null;
        this.navigationService.toMain();
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
      })
    );
  }

  refresh$(): Observable<Tokens> {
    return this.authApiService.refresh$().pipe(
      tap(tokens => AuthService.tokens = tokens)
    )
  }

  toSignInIfNotAuthorized(): boolean {
    const isLoggedIn = this.isLoggedIn;
    if (!isLoggedIn) {
      this.navigationService.toSignIn();
    }
    return isLoggedIn;
  }

  private static set tokens(tokens: Tokens) {
    localStorage.setItem('access_token', tokens.access_token);
    localStorage.setItem('refresh_token', tokens.refresh_token);
  }

}
