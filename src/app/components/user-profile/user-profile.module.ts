import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { TuiLetModule } from '@taiga-ui/cdk';
import { MoviesListModule } from '../common';
import { UserStatisticsModule } from './user-statistics/user-statistics.module';
import { UserProfileControlsModule } from './user-profile-controls/user-profile-controls.module';
import { UserListsModule } from './user-lists/user-lists.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { UserPreviewModule } from '../common';
import { ActionsListModule } from './actions-list/actions-list.module';
import { FollowsModule } from './follows/follows.module';

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    UserPreviewModule,
    TuiLetModule,
    MoviesListModule,
    AppRoutingModule,
    UserStatisticsModule,
    UserProfileControlsModule,
    UserListsModule,
    ActionsListModule,
    FollowsModule,
  ],
  exports: [UserProfileComponent],
})
export class UserProfileModule {}
