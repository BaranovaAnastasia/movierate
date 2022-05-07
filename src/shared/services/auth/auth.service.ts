import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
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

  signin$(email: string, password: string): void {
    this.authApiService.signin$(email, password).subscribe(
      result => {
        this.authApiService.getUser$().subscribe(
          user => {
            this.loggedInUser = user;
            this.navigationService.toMain();
          }
        );

        AuthService.tokens = result;
      }
    );
  }

  signup$(email: string, name: string, password: string): void {
    this.authApiService.signup$(email, name, password).subscribe(
      result => {
        AuthService.tokens = result;
        this.authApiService.getUser$().subscribe(
          user => {
            this.loggedInUser = user;
            this.navigationService.toMain();
          }
        );
      })
  }

  logout() { }

  refresh$(): Observable<Tokens> {
    return this.authApiService.refresh$().pipe(
      tap(tokens => AuthService.tokens = tokens)
    )
  }

  private static set tokens(tokens: Tokens) {
    localStorage.setItem('access_token', tokens.access_token);
    localStorage.setItem('refresh_token', tokens.refresh_token);
  }

}
