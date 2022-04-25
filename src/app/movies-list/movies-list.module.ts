import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesListComponent } from './movies-list.component';
import { MovieCardModule } from './movie-card/movie-card.module';



@NgModule({
  declarations: [
    MoviesListComponent
  ],
  imports: [
    CommonModule,
    MovieCardModule
  ],
  exports: [
    MoviesListComponent
  ]
})
export class MoviesListModule { }
