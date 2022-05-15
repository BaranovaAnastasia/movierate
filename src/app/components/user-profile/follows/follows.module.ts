import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowsComponent } from './follows.component';
import { TuiTabsModule } from '@taiga-ui/kit';
import { UserPreviewModule } from '../../common';
import { TuiButtonModule, TuiModeModule } from '@taiga-ui/core';

@NgModule({
  declarations: [FollowsComponent],
  imports: [
    CommonModule,
    TuiTabsModule,
    UserPreviewModule,
    TuiModeModule,
    TuiButtonModule,
  ],
  exports: [FollowsComponent],
})
export class FollowsModule {}
