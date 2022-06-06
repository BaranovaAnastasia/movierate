import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieComponent } from './movie.component';
import { MovieControlsModule } from './movie-controls/movie-controls.module';
import { MoviePosterModule } from './movie-poster/movie-poster.module';
import { MovieInfoModule } from './movie-info/movie-info.module';
import { MovieTrailerModule } from './movie-trailer/movie-trailer.module';
import { ReviewsListModule } from './reviews-list/reviews-list.module';

@NgModule({
  declarations: [MovieComponent],
  imports: [
    CommonModule,
    MovieControlsModule,
    ReviewsListModule,
    MoviePosterModule,
    MovieInfoModule,
    MovieTrailerModule,
  ],
  exports: [MovieComponent],
})
export class MovieModule {}
