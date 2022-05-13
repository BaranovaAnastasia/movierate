import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieRatingFormComponent } from './movie-rating-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiRatingModule } from '@taiga-ui/kit';



@NgModule({
  declarations: [
    MovieRatingFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FormsModule,
    ReactiveFormsModule,
    TuiRatingModule
  ],
  exports: [
    MovieRatingFormComponent
  ]
})
export class MovieRatingFormModule { }
