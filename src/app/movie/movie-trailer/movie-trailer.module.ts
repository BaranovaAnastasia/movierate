import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieTrailerComponent } from './movie-trailer.component';
import { TuiLetModule } from '@taiga-ui/cdk';



@NgModule({
  declarations: [
    MovieTrailerComponent
  ],
  imports: [
    CommonModule,
    TuiLetModule
  ],
  exports: [
    MovieTrailerComponent
  ]
})
export class MovieTrailerModule { }
