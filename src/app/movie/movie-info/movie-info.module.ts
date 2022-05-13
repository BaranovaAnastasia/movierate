import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieInfoComponent } from './movie-info.component';
import { MovieCreditsModule } from '../movie-credits/movie-credits.module';
import { StringifyPipesModule } from 'src/app/pipes/stringify-pipes.module';

@NgModule({
  declarations: [MovieInfoComponent],
  imports: [CommonModule, MovieCreditsModule, StringifyPipesModule],
  exports: [MovieInfoComponent],
})
export class MovieInfoModule {}
