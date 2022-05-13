import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserGenresStatsComponent } from './user-genres-stats.component';
import { TuiPieChartModule } from '@taiga-ui/addon-charts';



@NgModule({
  declarations: [
    UserGenresStatsComponent
  ],
  imports: [
    CommonModule,
    TuiPieChartModule
  ],
  exports: [
    UserGenresStatsComponent
  ]
})
export class UserGenresStatsModule { }
