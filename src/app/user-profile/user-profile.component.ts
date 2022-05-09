import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MoviesList, User } from 'src/shared/models';
import { AuthService, ListsService, UserService } from 'src/shared/services';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.less']
})
export class UserProfileComponent implements OnInit {
  user!: User;
  isMyProfile$?: Observable<boolean>;

  favourites?: MoviesList;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private listsService: ListsService,
    private activatedroute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedroute.params.subscribe(routeParams => {
      this.userService.getUserById(routeParams.id).subscribe(
        user => this.user = user
      );

      this.isMyProfile$ = this.authService.loggedInUser$.pipe(
        map(user => user ? user.id == routeParams.id : false)
      );

      this.listsService.getFavourites$(routeParams.id).subscribe(
        list => this.favourites = list
      );

    });
  }

  get isFollowing(): boolean {
    return false;
  }

  get followText(): string {
    return this.isFollowing ? "Unfollow" : "Follow";
  }

  logout() {
    this.authService.logout$()
      .subscribe(() => { });
  }

}
