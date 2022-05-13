import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCreditsComponent } from './movie-credits.component';
import { StringifyPipesModule } from 'src/app/pipes/stringify-pipes.module';



@NgModule({
  declarations: [
    MovieCreditsComponent
  ],
  imports: [
    CommonModule,
    StringifyPipesModule
  ],
  exports: [
    MovieCreditsComponent
  ]
})
export class MovieCreditsModule { }
