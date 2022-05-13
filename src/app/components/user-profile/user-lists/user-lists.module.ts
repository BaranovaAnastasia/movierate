import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListsComponent } from './user-lists.component';
import { MoviesListModule } from '../../common';

@NgModule({
  declarations: [UserListsComponent],
  imports: [CommonModule, MoviesListModule],
  exports: [UserListsComponent],
})
export class UserListsModule {}
