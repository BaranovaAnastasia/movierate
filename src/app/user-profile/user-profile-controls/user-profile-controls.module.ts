import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileControlsComponent } from './user-profile-controls.component';
import { TuiLetModule } from '@taiga-ui/cdk';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [UserProfileControlsComponent],
  imports: [CommonModule, TuiLetModule, AppRoutingModule],
  exports: [UserProfileControlsComponent],
})
export class UserProfileControlsModule {}
