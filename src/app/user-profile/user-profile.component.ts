import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { UserMovieInteractionService, UserService } from 'src/shared/services';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent {
  user$ = this.activatedroute.params.pipe(
    mergeMap(params => this.userService.getUserById(params.id)),
  );

  favourites$ = this.activatedroute.params.pipe(
    mergeMap(params => this.favouritesService.getFavourites$(params.id)),
  );

  constructor(
    private userService: UserService,
    private favouritesService: UserMovieInteractionService,
    private activatedroute: ActivatedRoute
  ) { }

}
