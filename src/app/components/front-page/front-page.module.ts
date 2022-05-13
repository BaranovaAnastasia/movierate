import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontPageComponent } from './front-page.component';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { MoviesListModule } from '../common';

@NgModule({
  declarations: [FrontPageComponent],
  imports: [CommonModule, MoviesListModule, LeaderboardModule],
  exports: [FrontPageComponent],
})
export class FrontPageModule {}
