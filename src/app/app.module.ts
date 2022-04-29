import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TuiRootModule, TuiDialogModule, TUI_SANITIZER } from "@taiga-ui/core";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './header/header.module';
import { AuthorizationModule } from "./authorization/authorization.module";
import { IMovieApiServiceToken } from "src/shared/interfaces/IMovieApiService";
import { MovieModule } from "./movie/movie.module";
import { UserProfileModule } from "./user-profile/user-profile.module";
import { MoviesListModule } from "./movies-list/movies-list.module";
import { FrontPageModule } from "./front-page/front-page.module";
import { TMDBMovieApiService } from "src/shared/services/tmdb-movie-api.service";
import { HttpClientModule } from "@angular/common/http";
import { IMoviesListApiServiceToken } from "src/shared/interfaces/IMoviesListApi";
import { TMDBMoviesListApiService } from "src/shared/services/tmdb-movies-list-api.service";
import { IReviewsApiServiceToken } from "src/shared/interfaces/IReviewsApiService";
import { TMDBReviewsApiService } from "src/shared/services/tmdb-reviews-api.service";

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
    AuthorizationModule,
    MovieModule,
    UserProfileModule,
    MoviesListModule,
    FrontPageModule,
    HttpClientModule
  ],
  providers: [
    { provide: TUI_SANITIZER, useClass: NgDompurifySanitizer },
    { provide: IMovieApiServiceToken, useClass: TMDBMovieApiService },
    // { provide: IUserApiServiceToken, useClass: UserMockApiService },
    { provide: IMoviesListApiServiceToken, useClass: TMDBMoviesListApiService },
    { provide: IReviewsApiServiceToken, useClass: TMDBReviewsApiService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
