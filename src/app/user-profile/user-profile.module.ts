import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { UserPreviewModule } from '../user-preview/user-preview.module';
import { TuiLetModule } from '@taiga-ui/cdk';
import { MoviesListModule } from '../movies-list/movies-list.module';
import { AppRoutingModule } from '../app-routing.module';
import { UserStatisticsModule } from './user-statistics/user-statistics.module';
import { UserProfileControlsModule } from './user-profile-controls/user-profile-controls.module';
import { UserListsModule } from './user-lists/user-lists.module';



@NgModule({
  declarations: [
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    UserPreviewModule,
    TuiLetModule,
    MoviesListModule,
    AppRoutingModule,
    UserStatisticsModule,
    UserProfileControlsModule,
    UserListsModule
  ],
  exports: [
    UserProfileComponent
  ]
})
export class UserProfileModule { }
