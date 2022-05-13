import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTopComponent } from './user-top.component';
import { UserTopEntryModule } from '../user-top-entry/user-top-entry.module';

@NgModule({
  declarations: [UserTopComponent],
  imports: [CommonModule, UserTopEntryModule],
  exports: [UserTopComponent],
})
export class UserTopModule {}
