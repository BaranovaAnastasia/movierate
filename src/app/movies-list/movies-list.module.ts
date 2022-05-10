import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesListComponent } from './movies-list.component';
import { MovieCardModule } from './movie-card/movie-card.module';
import { TuiAlertModule, TuiButtonModule, TuiModeModule } from '@taiga-ui/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiRadioLabeledModule } from '@taiga-ui/kit';



@NgModule({
  declarations: [
    MoviesListComponent
  ],
  imports: [
    CommonModule,
    MovieCardModule,
    FormsModule,
    ReactiveFormsModule,
    TuiButtonModule,
    TuiModeModule,
    TuiRadioLabeledModule,
    TuiAlertModule
  ],
  exports: [
    MoviesListComponent
  ]
})
export class MoviesListModule { }
