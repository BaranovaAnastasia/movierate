import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewsListComponent } from './reviews-list.component';
import { ReviewFormModule } from '../review-form/review-form.module';
import { ReviewModule } from '../review/review.module';
import { TuiExpandModule, TuiSvgModule } from '@taiga-ui/core';
import { SectionTitleModule } from 'src/app/section-title/section-title.module';

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
