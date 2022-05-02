import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUserApiService, IUserApiServiceToken } from 'src/shared/interfaces/IUserApiService';
import { User } from 'src/shared/models/user/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.less']
})
export class UserProfileComponent implements OnInit {
  user!: User;

  constructor(
    @Inject(IUserApiServiceToken) private userApiService: IUserApiService,
    private activatedroute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedroute.params.subscribe(routeParams => {
      this.userApiService.getUserById(routeParams.id).subscribe(
        user => {
          this.user = user;
        }
      )
    });
  }

  get isMyProfile(): boolean {
    return false;
  }

  get isFollowing(): boolean {
    return false;
  }

  get activityText(): string {
    return this.isMyProfile ? "Friends Activity" : "Activity";
  }

  get followText(): string {
    return this.isFollowing ? "Unfollow" : "Follow";
  }

}
