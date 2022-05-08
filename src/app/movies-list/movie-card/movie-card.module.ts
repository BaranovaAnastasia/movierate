import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from './movie-card.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { TuiProgressModule } from '@taiga-ui/kit';
import { StringifyPipesModule } from 'src/app/pipes/stringify-pipes.module';



@NgModule({
  declarations: [
    MovieCardComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    TuiProgressModule,
    StringifyPipesModule
  ],
  exports: [
    MovieCardComponent
  ]
})
export class MovieCardModule { }
