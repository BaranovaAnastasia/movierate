import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TuiRootModule, TuiDialogModule, TuiNotificationsModule, TUI_SANITIZER } from "@taiga-ui/core";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './header/header.module';
import { AuthorizationModule } from "./authorization/authorization.module";
import { IMovieApiServiceToken } from "src/shared/interfaces/IMovieApiService";
import { MovieMockApiService } from "src/shared/services/movie-mock-api.service";
import { MovieModule } from "./movie/movie.module";
import { UserMockApiService } from "src/shared/services/user-mock-api.service";
import { IUserApiServiceToken } from "src/shared/interfaces/IUserApiService";
import { UserProfileModule } from "./user-profile/user-profile.module";
import { MoviesListModule } from "./movies-list/movies-list.module";

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
    MoviesListModule
],
  providers: [
    {provide: TUI_SANITIZER, useClass: NgDompurifySanitizer},
    {provide: IMovieApiServiceToken, useClass: MovieMockApiService},
    {provide: IUserApiServiceToken, useClass: UserMockApiService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
