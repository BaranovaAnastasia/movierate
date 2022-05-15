import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowsComponent } from './follows.component';
import { TuiTabsModule } from '@taiga-ui/kit';
import { UserPreviewModule } from '../../common';
import { TuiButtonModule, TuiModeModule, TuiSvgModule } from '@taiga-ui/core';

@NgModule({
  declarations: [FollowsComponent],
  imports: [
    CommonModule,
    TuiTabsModule,
    UserPreviewModule,
    TuiSvgModule,
    TuiModeModule,
    TuiButtonModule,
  ],
  exports: [FollowsComponent],
})
export class FollowsModule {}
