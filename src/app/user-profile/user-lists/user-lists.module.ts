import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListsComponent } from './user-lists.component';
import { MoviesListModule } from 'src/app/movies-list/movies-list.module';



@NgModule({
  declarations: [
    UserListsComponent
  ],
  imports: [
    CommonModule,
    MoviesListModule
  ],
  exports: [
    UserListsComponent
  ]
})
export class UserListsModule { }
