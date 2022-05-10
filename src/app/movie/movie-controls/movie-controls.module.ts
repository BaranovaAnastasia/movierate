import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieControlsComponent } from './movie-controls.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiRatingModule } from '@taiga-ui/kit';
import { TuiDialogModule } from '@taiga-ui/core';
import { ListSelectDialogModule } from './list-select-dialog/list-select-dialog.module';



@NgModule({
  declarations: [
    MovieControlsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    TuiRatingModule,
    FormsModule,
    ReactiveFormsModule,
    TuiDialogModule,
    ListSelectDialogModule
  ],
  exports: [
    MovieControlsComponent
  ]
})
export class MovieControlsModule { }
