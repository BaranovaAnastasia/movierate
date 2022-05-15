import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontPageComponent } from './front-page.component';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { MoviesListModule } from '../common';
import { TuiLetModule } from '@taiga-ui/cdk';
import { TuiLoaderModule } from '@taiga-ui/core';

@NgModule({
  declarations: [FrontPageComponent],
  imports: [
    CommonModule,
    MoviesListModule,
    LeaderboardModule,
    TuiLetModule,
    TuiLoaderModule,
  ],
  exports: [FrontPageComponent],
})
export class FrontPageModule {}
