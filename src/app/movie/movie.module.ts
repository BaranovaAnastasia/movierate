import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieComponent } from './movie.component';
import { MovieControlsModule } from './movie-controls/movie-controls.module';
import { StringifyPipesModule } from '../pipes/stringify-pipes.module';
import { ReviewModule } from '../review/review.module';



@NgModule({
  declarations: [
    MovieComponent
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
