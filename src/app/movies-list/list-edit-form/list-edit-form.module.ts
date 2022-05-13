import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListEditFormComponent } from './list-edit-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule, TuiModeModule, TuiAlertModule, TuiSvgModule } from '@taiga-ui/core';
import { TuiRadioLabeledModule } from '@taiga-ui/kit';



@NgModule({
  declarations: [
    ListEditFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiButtonModule,
    TuiModeModule,
    TuiRadioLabeledModule,
    TuiAlertModule,
    TuiSvgModule
  ],
  exports: [
    ListEditFormComponent
  ]
})
export class ListEditFormModule { }
