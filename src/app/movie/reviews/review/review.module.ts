import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewComponent } from './review.component';
import { UserPreviewModule } from '../../../user-preview/user-preview.module';
import { StringifyPipesModule } from '../../../pipes/stringify-pipes.module';
import { TuiRatingModule } from '@taiga-ui/kit';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ReviewComponent
  ],
  imports: [
    CommonModule,
    UserPreviewModule,
    StringifyPipesModule,
    FormsModule,
    ReactiveFormsModule,
    TuiRatingModule
  ],
  exports: [
    ReviewComponent
  ]
})
export class ReviewModule { }
