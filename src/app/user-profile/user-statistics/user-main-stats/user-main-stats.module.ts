import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserMainStatsComponent } from './user-main-stats.component';
import { TuiProgressModule } from '@taiga-ui/kit';



@NgModule({
  declarations: [
    UserMainStatsComponent
  ],
  imports: [
    CommonModule,
    TuiProgressModule
  ],
  exports: [
    UserMainStatsComponent
  ]
})
export class UserMainStatsModule { }
