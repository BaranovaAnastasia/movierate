import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionComponent } from './action.component';
import { UserPreviewModule } from 'src/app/components/common';
import { StringifyPipesModule } from 'src/app/pipes';
import { RatingActionModule } from './rating-action/rating-action.module';
import { ReviewActionModule } from './review-action/review-action.module';
import { WatchActionModule } from './watch-action/watch-action.module';
import { ListActionModule } from './list-action/list-action.module';

@NgModule({
  declarations: [ActionComponent],
  imports: [
    CommonModule,
    UserPreviewModule,
    StringifyPipesModule,

    RatingActionModule,
    ReviewActionModule,
    WatchActionModule,
    ListActionModule,
  ],
  exports: [ActionComponent],
})
export class ActionModule {}
