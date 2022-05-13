import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserStatisticsComponent } from './user-statistics.component';
import { UserMainStatsModule } from './user-main-stats/user-main-stats.module';
import { UserGenresStatsModule } from './user-genres-stats/user-genres-stats.module';



@NgModule({
  declarations: [
    UserStatisticsComponent
  ],
  imports: [
    CommonModule,
    UserMainStatsModule,
    UserGenresStatsModule
  ],
  exports: [
    UserStatisticsComponent
  ]
})
export class UserStatisticsModule { }
