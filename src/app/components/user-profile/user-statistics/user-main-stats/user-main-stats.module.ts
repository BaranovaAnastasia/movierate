import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserMainStatsComponent } from './user-main-stats.component';
import { TuiProgressModule } from '@taiga-ui/kit';
import { TuiLoaderModule } from '@taiga-ui/core';
import { TuiLetModule } from '@taiga-ui/cdk';

@NgModule({
  declarations: [UserMainStatsComponent],
  imports: [CommonModule, TuiProgressModule, TuiLoaderModule, TuiLetModule],
  exports: [UserMainStatsComponent],
})
export class UserMainStatsModule {}
