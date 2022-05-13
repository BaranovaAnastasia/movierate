import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesListComponent } from './movies-list.component';
import { MovieCardModule } from './movie-card/movie-card.module';
import {
  TuiAlertModule,
  TuiButtonModule,
  TuiModeModule,
  TuiSvgModule,
} from '@taiga-ui/core';
import { TuiRadioLabeledModule } from '@taiga-ui/kit';
import { ListEditFormModule } from './list-edit-form/list-edit-form.module';
import { SectionTitleModule } from '../section-title/section-title.module';

@NgModule({
  declarations: [MoviesListComponent],
  imports: [
    CommonModule,
    MovieCardModule,
    TuiModeModule,
    TuiRadioLabeledModule,
    TuiAlertModule,
    TuiSvgModule,
    SectionTitleModule,
    ListEditFormModule,
    TuiButtonModule,
  ],
  exports: [MoviesListComponent],
})
export class MoviesListModule {}
