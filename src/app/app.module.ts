import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TuiRootModule, TuiDialogModule, TUI_SANITIZER } from "@taiga-ui/core";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './header/header.module';
import { IMovieApiServiceToken } from "src/shared/interfaces/IMovieApiService";
import { MovieModule } from "./movie/movie.module";
import { UserProfileModule } from "./user-profile/user-profile.module";
import { MoviesListModule } from "./movies-list/movies-list.module";
import { FrontPageModule } from "./front-page/front-page.module";
import { TMDBMovieApiService } from "src/shared/services/tmdb/tmdb-movie-api.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { IMoviesListApiServiceToken } from "src/shared/interfaces/IMoviesListApi";
import { IReviewsApiServiceToken } from "src/shared/interfaces/IReviewsApiService";
import { IAuthApiServiceToken } from "src/shared/interfaces/IAuthApiService";
import { AuthApiService } from "src/shared/services/auth/auth-api.service";
import { AuthModule } from "./auth/auth.module";
import { AuthInterceptor } from "src/shared/interceptors/auth.interceptor";
import { UserApiService } from "src/shared/services/user/user-api.service";
import { IUserApiServiceToken } from "src/shared/interfaces/IUserApiService";
import { TMDBMoviesListApiService } from "src/shared/services/tmdb/tmdb-movies-list-api.service";
import { TMDBReviewsApiService } from "src/shared/services/tmdb/tmdb-reviews-api.service";
import { ErrorInterceptor } from "src/shared/interceptors/error.interceptor";
import { IUserMovieInteractionApiServiceToken } from "src/shared/interfaces/IUserMovieInteractionApiService";
import { UserMovieInteractionApiService } from "src/shared/services/user-movie-interaction/user-movie-interaction-api.service";

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
    { provide: IReviewsApiServiceToken, useClass: TMDBReviewsApiService },
    { provide: IAuthApiServiceToken, useClass: AuthApiService },
    { provide: IUserMovieInteractionApiServiceToken, useClass: UserMovieInteractionApiService },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
