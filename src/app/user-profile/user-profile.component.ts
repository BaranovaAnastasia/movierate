import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/shared/models';
import { UserService } from 'src/shared/services';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.less']
})
export class UserProfileComponent implements OnInit {
  user!: User;

  constructor(
    private userService: UserService,
    private activatedroute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedroute.params.subscribe(routeParams => {
      this.userService.getUserById(routeParams.id).subscribe(
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
