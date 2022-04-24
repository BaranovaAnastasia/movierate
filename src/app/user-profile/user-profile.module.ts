import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { UserStatisticsComponent } from './user-statistics/user-statistics.component';
import { TuiProgressModule } from '@taiga-ui/kit';
import { TuiPieChartModule } from '@taiga-ui/addon-charts';



@NgModule({
  declarations: [
    UserProfileComponent,
    UserStatisticsComponent
  ],
  imports: [
    CommonModule,
    TuiProgressModule,
    TuiPieChartModule
  ],
  exports: [
    UserProfileComponent
  ]
})
export class UserProfileModule { }
