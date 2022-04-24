import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieControlsComponent } from './movie-controls.component';
import { FormsModule } from '@angular/forms';
import { TuiRatingModule } from '@taiga-ui/kit';



@NgModule({
  declarations: [
    MovieControlsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TuiRatingModule,
  ],
  exports: [
    MovieControlsComponent
  ]
})
export class MovieControlsModule { }
