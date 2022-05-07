import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieComponent } from './movie.component';
import { MovieControlsModule } from './movie-controls/movie-controls.module';
import { StringifyPipesModule } from '../pipes/stringify-pipes.module';
import { MovieTrailerComponent } from './movie-trailer/movie-trailer.component';
import { TuiSvgModule } from '@taiga-ui/core';
import { ReviewsModule } from './reviews/reviews.module';
import { MovieCreditsComponent } from './movie-credits/movie-credits.component';



@NgModule({
  declarations: [
    MovieComponent,
    MovieTrailerComponent,
    MovieCreditsComponent
  ],
  imports: [
    CommonModule,
    MovieControlsModule,
    StringifyPipesModule,
    ReviewsModule,
    TuiSvgModule
  ],
  exports: [
    MovieComponent
  ]
})
export class MovieModule { }
