import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import { Observable } from 'rxjs';
import { UserStats } from 'src/shared/models';
import { UserService } from 'src/shared/services';
import { STATS_STEPS } from '../../constants';

@Component({
  selector: 'app-user-main-stats',
  templateUrl: './user-main-stats.component.html',
  styleUrls: ['./user-main-stats.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserMainStatsComponent implements OnChanges {
  @Input() userId!: number;

  stats$!: Observable<UserStats | undefined>;

  constructor(private userService: UserService) {}

  ngOnChanges(): void {
    this.stats$ = this.userService.getUserStats$(this.userId);
  }

  getNextGoal(value: number): number {
    const result = STATS_STEPS.reduce((prev, curr) =>
      prev <= value || curr - value < prev - value ? curr : prev,
    );
    if (result <= value) {
      return Math.ceil(value / result) * result;
    }
    return result;
  }
}
