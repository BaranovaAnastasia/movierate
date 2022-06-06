import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewComponent } from './review.component';
import { TuiRatingModule } from '@taiga-ui/kit';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StringifyPipesModule } from 'src/app/pipes';
import { UserDatedPreviewModule } from 'src/app/components/common/user-dated-preview/user-dated-preview.module';

@NgModule({
  declarations: [ReviewComponent],
  imports: [
    CommonModule,
    UserDatedPreviewModule,
    StringifyPipesModule,
    FormsModule,
    ReactiveFormsModule,
    TuiRatingModule,
  ],
  exports: [ReviewComponent],
})
export class ReviewModule {}
