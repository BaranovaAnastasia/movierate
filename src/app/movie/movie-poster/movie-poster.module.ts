import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviePosterComponent } from './movie-poster.component';

@NgModule({
  declarations: [MoviePosterComponent],
  imports: [CommonModule],
  exports: [MoviePosterComponent],
})
export class MoviePosterModule {}
