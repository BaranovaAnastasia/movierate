import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './search-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiSvgModule } from '@taiga-ui/core';


@NgModule({
  declarations: [
    SearchBarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiSvgModule,
  ],
  exports: [
    SearchBarComponent
  ]
})
export class SearchBarModule { }
