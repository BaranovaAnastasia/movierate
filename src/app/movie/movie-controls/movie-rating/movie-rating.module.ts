import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieRatingComponent } from './movie-rating.component';

@NgModule({
  declarations: [MovieRatingComponent],
  imports: [CommonModule],
  exports: [MovieRatingComponent],
})
export class MovieRatingModule {}
