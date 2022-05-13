import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontPageComponent } from './front-page.component';
import { MoviesListModule } from '../movies-list/movies-list.module';
import { LeaderboardModule } from '../leaderboard/leaderboard.module';

@NgModule({
  declarations: [FrontPageComponent],
  imports: [CommonModule, MoviesListModule, LeaderboardModule],
  exports: [FrontPageComponent],
})
export class FrontPageModule {}
