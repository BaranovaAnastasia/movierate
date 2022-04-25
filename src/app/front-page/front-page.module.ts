import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontPageComponent } from './front-page.component';
import { MoviesListModule } from '../movies-list/movies-list.module';



@NgModule({
  declarations: [
    FrontPageComponent
  ],
  imports: [
    CommonModule,
    MoviesListModule
  ],
  exports: [
    FrontPageComponent
  ]
})
export class FrontPageModule { }
