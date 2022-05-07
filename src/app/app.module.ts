import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TuiRootModule, TuiDialogModule, TUI_SANITIZER } from "@taiga-ui/core";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './header/header.module';
import { MovieModule } from "./movie/movie.module";
import { UserProfileModule } from "./user-profile/user-profile.module";
import { MoviesListModule } from "./movies-list/movies-list.module";
import { FrontPageModule } from "./front-page/front-page.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthModule } from "./auth/auth.module";
import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { IAuthApiServiceToken, IMovieApiServiceToken, IMoviesListApiServiceToken, IReviewsApiServiceToken, IUserApiServiceToken, IUserMovieInteractionApiServiceToken } from "src/shared/interfaces";
import { AuthApiService, ReviewsApiService, TMDBMovieApiService, TMDBMoviesListApiService, UserApiService, UserMovieInteractionApiService } from "src/shared/services";
import { ErrorInterceptor, AuthInterceptor } from "src/shared/interceptors";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    TuiRootModule,
    BrowserAnimationsModule,
    TuiDialogModule,
    AuthModule,
    MovieModule,
    UserProfileModule,
    MoviesListModule,
    FrontPageModule,
    HttpClientModule
  ],
  providers: [
    { provide: TUI_SANITIZER, useClass: NgDompurifySanitizer },
    { provide: IMovieApiServiceToken, useClass: TMDBMovieApiService },
    { provide: IUserApiServiceToken, useClass: UserApiService },
    { provide: IMoviesListApiServiceToken, useClass: TMDBMoviesListApiService },
    { provide: IReviewsApiServiceToken, useClass: ReviewsApiService },
    { provide: IAuthApiServiceToken, useClass: AuthApiService },
    { provide: IUserMovieInteractionApiServiceToken, useClass: UserMovieInteractionApiService },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
