import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewComponent } from './review.component';
import { UserPreviewModule } from '../user-preview/user-preview.module';
import { StringifyPipesModule } from '../pipes/stringify-pipes.module';



@NgModule({
  declarations: [
    ReviewComponent
  ],
  imports: [
    CommonModule,
    UserPreviewModule,
    StringifyPipesModule
  ],
  exports: [
    ReviewComponent
  ]
})
export class ReviewModule { }
