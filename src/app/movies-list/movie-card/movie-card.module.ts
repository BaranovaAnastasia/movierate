import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from './movie-card.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { TuiProgressModule } from '@taiga-ui/kit';



@NgModule({
  declarations: [
    MovieCardComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    TuiProgressModule
  ],
  exports: [
    MovieCardComponent
  ]
})
export class MovieCardModule { }
