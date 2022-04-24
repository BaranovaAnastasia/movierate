import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieComponent } from './movie.component';
import { MovieControlsModule } from './movie-controls/movie-controls.module';



@NgModule({
  declarations: [
    MovieComponent
  ],
  imports: [
    CommonModule,
    MovieControlsModule,
  ],
  exports: [
    MovieComponent
  ]
})
export class MovieModule { }
