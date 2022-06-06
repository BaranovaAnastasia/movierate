import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewActionComponent } from './review-action.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiRatingModule } from '@taiga-ui/kit';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { StringifyPipesModule } from 'src/app/pipes';

@NgModule({
  declarations: [ReviewActionComponent],
  imports: [
    CommonModule,
    StringifyPipesModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TuiRatingModule,
  ],
  exports: [ReviewActionComponent],
})
export class ReviewActionModule {}
