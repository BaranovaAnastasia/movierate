import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingActionComponent } from './rating-action.component';
import { StringifyPipesModule } from 'src/app/pipes';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiRatingModule } from '@taiga-ui/kit';

@NgModule({
  declarations: [RatingActionComponent],
  imports: [
    CommonModule,
    StringifyPipesModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TuiRatingModule,
  ],
  exports: [RatingActionComponent],
})
export class RatingActionModule {}
