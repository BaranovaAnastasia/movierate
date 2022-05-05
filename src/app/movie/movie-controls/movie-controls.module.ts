import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieControlsComponent } from './movie-controls.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiRatingModule } from '@taiga-ui/kit';



@NgModule({
  declarations: [
    MovieControlsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TuiRatingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MovieControlsComponent
  ]
})
export class MovieControlsModule { }
