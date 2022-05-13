import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPreviewComponent } from './user-preview.component';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [UserPreviewComponent],
  imports: [CommonModule, AppRoutingModule],
  exports: [UserPreviewComponent],
})
export class UserPreviewModule {}
