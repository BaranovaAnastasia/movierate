import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { User } from 'src/shared/models';
import { UserMovieInteractionService, UserService } from 'src/shared/services';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent {
  user$ = this.activatedroute.params.pipe(
    mergeMap(params => this.userService.getUserById$(params.id)),
  );

  favourites$ = this.activatedroute.params.pipe(
    mergeMap(params => this.favouritesService.getFavourites$(params.id)),
  );
  watched$ = this.activatedroute.params.pipe(
    mergeMap(params => this.favouritesService.getWatched$(params.id)),
  );

  following$ = this.activatedroute.params.pipe(
    mergeMap(params => this.userService.getFollowing$(params.id)),
  );
  followers$ = this.activatedroute.params.pipe(
    mergeMap(params => this.userService.getFollowedBy$(params.id)),
  );

  constructor(
    private userService: UserService,
    private favouritesService: UserMovieInteractionService,
    private activatedroute: ActivatedRoute,
  ) {}

  follow(newFollowers: Observable<User[]>): void {
    this.followers$ = newFollowers;
  }
  unfollow(newFollowers: Observable<User[]>): void {
    this.followers$ = newFollowers;
  }
}
