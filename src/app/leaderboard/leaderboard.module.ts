import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaderboardComponent } from './leaderboard.component';
import { UserTopModule } from './user-top/user-top.module';
import { SectionTitleModule } from 'src/app/section-title/section-title.module';



@NgModule({
  declarations: [
    LeaderboardComponent
  ],
  imports: [
    CommonModule,
    UserTopModule,
    SectionTitleModule
  ],
  exports: [
    LeaderboardComponent
  ]
})
export class LeaderboardModule { }
