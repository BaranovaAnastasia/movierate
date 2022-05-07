import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiSvgModule, TuiExpandModule, TuiModeModule, TuiTextfieldControllerModule, TuiButtonModule, TuiLabelModule } from '@taiga-ui/core';
import { TuiInputModule, TuiTextAreaModule, TuiRatingModule } from '@taiga-ui/kit';
import { ReviewFormComponent } from './review-form/review-form.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ReviewModule } from 'src/app/review/review.module';



@NgModule({
  declarations: [
    ReviewFormComponent,
    ReviewsComponent
  ],
  imports: [
    CommonModule,
    TuiSvgModule,
    TuiExpandModule,
    FormsModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiTextAreaModule,
    TuiModeModule,
    TuiRatingModule,
    TuiTextfieldControllerModule,
    TuiButtonModule,
    TuiLabelModule,
    ReviewModule
  ],
  exports: [
    ReviewsComponent
  ]
})
export class ReviewsModule { }
