import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieComponent } from './movie.component';
import { MovieControlsModule } from './movie-controls/movie-controls.module';
import { StringifyPipesModule } from '../pipes/stringify-pipes.module';
import { ReviewModule } from '../review/review.module';
import { MovieTrailerComponent } from './movie-trailer/movie-trailer.component';



@NgModule({
  declarations: [
    MovieComponent,
    MovieTrailerComponent
  ],
  imports: [
    CommonModule,
    MovieControlsModule,
    StringifyPipesModule,
    ReviewModule
  ],
  exports: [
    MovieComponent
  ]
})
export class MovieModule { }
