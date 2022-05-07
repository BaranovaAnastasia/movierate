import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTopComponent } from './user-top.component';
import { UserPreviewModule } from 'src/app/user-preview/user-preview.module';



@NgModule({
  declarations: [
    UserTopComponent
  ],
  imports: [
    CommonModule,
    UserPreviewModule
  ],
  exports: [
    UserTopComponent
  ]
})
export class UserTopModule { }
