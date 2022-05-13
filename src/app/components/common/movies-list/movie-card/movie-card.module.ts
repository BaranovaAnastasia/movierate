import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from './movie-card.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { TuiProgressModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiModeModule } from '@taiga-ui/core';
import { StringifyPipesModule } from 'src/app/pipes';

@NgModule({
  declarations: [MovieCardComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    TuiProgressModule,
    StringifyPipesModule,
    TuiButtonModule,
    TuiModeModule,
  ],
  exports: [MovieCardComponent],
})
export class MovieCardModule {}
