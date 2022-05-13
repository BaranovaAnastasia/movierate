import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieWatchedStatsComponent } from './movie-watched-stats.component';



@NgModule({
  declarations: [
    MovieWatchedStatsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MovieWatchedStatsComponent
  ]
})
export class MovieWatchedStatsModule { }
