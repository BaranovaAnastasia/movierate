import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDatedPreviewComponent } from './user-dated-preview.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { StringifyPipesModule } from 'src/app/pipes';

@NgModule({
  declarations: [UserDatedPreviewComponent],
  imports: [CommonModule, AppRoutingModule, StringifyPipesModule],
  exports: [UserDatedPreviewComponent],
})
export class UserDatedPreviewModule {}
