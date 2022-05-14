import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AuthService, NavigationService } from "../services";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private navigationService: NavigationService
  ) { }

  canActivate(): Observable<boolean> {
    return this.authService.loggedInUser$.pipe(
      map(result => {
        if (result !== null) {
          this.navigationService.toMain();
        }

        return result === null;
      })
    );
  }
}