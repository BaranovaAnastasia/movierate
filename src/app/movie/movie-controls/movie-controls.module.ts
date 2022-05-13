import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieControlsComponent } from './movie-controls.component';
import { ListSelectDialogModule } from './list-select-dialog/list-select-dialog.module';
import { TuiLetModule } from '@taiga-ui/cdk';
import { MovieRatingModule } from './movie-rating/movie-rating.module';
import { MovieRatingFormModule } from './movie-rating-form/movie-rating-form.module';
import { MovieWatchedStatsModule } from './movie-watched-stats/movie-watched-stats.module';
import { MovieWatchModule } from './movie-watch/movie-watch.module';
import { MovieToFavouriteModule } from './movie-to-favourite/movie-to-favourite.module';
import { MovieToListModule } from './movie-to-list/movie-to-list.module';



@NgModule({
  declarations: [
    MovieControlsComponent
  ],
  imports: [
    CommonModule,
    MovieRatingModule,
    MovieRatingFormModule,
    MovieWatchedStatsModule,
    MovieWatchModule,
    MovieToFavouriteModule,
    MovieToListModule,
    ListSelectDialogModule,
    TuiLetModule
  ],
  exports: [
    MovieControlsComponent
  ]
})
export class MovieControlsModule { }
