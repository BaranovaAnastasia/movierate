import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontPageComponent } from './front-page.component';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { MoviesListModule } from '../common';
import { TuiLetModule } from '@taiga-ui/cdk';

@NgModule({
  declarations: [FrontPageComponent],
  imports: [CommonModule, MoviesListModule, LeaderboardModule, TuiLetModule],
  exports: [FrontPageComponent],
})
export class FrontPageModule {}
