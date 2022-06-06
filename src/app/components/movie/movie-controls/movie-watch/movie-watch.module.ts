import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieWatchComponent } from './movie-watch.component';

@NgModule({
  declarations: [MovieWatchComponent],
  imports: [CommonModule],
  exports: [MovieWatchComponent],
})
export class MovieWatchModule {}
