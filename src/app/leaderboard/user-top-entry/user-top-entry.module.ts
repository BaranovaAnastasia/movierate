import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTopEntryComponent } from './user-top-entry.component';
import { UserPreviewModule } from 'src/app/user-preview/user-preview.module';

@NgModule({
  declarations: [UserTopEntryComponent],
  imports: [CommonModule, UserPreviewModule],
  exports: [UserTopEntryComponent],
})
export class UserTopEntryModule {}
