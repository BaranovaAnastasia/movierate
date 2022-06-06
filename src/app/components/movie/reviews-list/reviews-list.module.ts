import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewsListComponent } from './reviews-list.component';
import { TuiExpandModule, TuiSvgModule } from '@taiga-ui/core';
import { ReviewFormModule } from './review-form/review-form.module';
import { ReviewModule } from './review/review.module';
import { SectionTitleModule } from '../../common';

@NgModule({
  declarations: [ReviewsListComponent],
  imports: [
    CommonModule,
    ReviewFormModule,
    ReviewModule,
    TuiExpandModule,
    TuiSvgModule,
    SectionTitleModule,
  ],
  exports: [ReviewsListComponent],
})
export class ReviewsListModule {}
