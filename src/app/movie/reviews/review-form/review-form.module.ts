import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewFormComponent } from './review-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiInputModule, TuiRatingModule, TuiTextAreaModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiModeModule, TuiTextfieldControllerModule } from '@taiga-ui/core';



@NgModule({
  declarations: [
    ReviewFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiRatingModule,
    TuiInputModule,
    TuiTextAreaModule,
    TuiModeModule,
    TuiButtonModule,
    TuiTextfieldControllerModule
  ],
  exports: [
    ReviewFormComponent
  ]
})
export class ReviewFormModule { }
