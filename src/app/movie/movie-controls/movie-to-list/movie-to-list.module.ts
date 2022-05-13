import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieToListComponent } from './movie-to-list.component';
import { TuiDialogModule } from '@taiga-ui/core';



@NgModule({
  declarations: [
    MovieToListComponent
  ],
  imports: [
    CommonModule,
    TuiDialogModule
  ],
  exports: [
    MovieToListComponent
  ]
})
export class MovieToListModule { }
