import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserService } from 'src/shared/services';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeaderboardComponent {
  topByMovies$ = this.userService.getUserTop('movies', 3);
  topByTime$ = this.userService.getUserTop('minutes', 3);
  topByReviews$ = this.userService.getUserTop('reviews', 3);

  constructor(private userService: UserService) { }
}
