import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaderboardComponent } from './leaderboard.component';
import { UserTopModule } from '../user-top/user-top.module';



@NgModule({
  declarations: [
    LeaderboardComponent
  ],
  imports: [
    CommonModule,
    UserTopModule
  ],
  exports: [
    LeaderboardComponent
  ]
})
export class LeaderboardModule { }
