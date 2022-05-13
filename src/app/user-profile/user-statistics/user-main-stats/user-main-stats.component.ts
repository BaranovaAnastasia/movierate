import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStats } from 'src/shared/models';
import { UserService } from 'src/shared/services';

@Component({
  selector: 'app-user-main-stats',
  templateUrl: './user-main-stats.component.html',
  styleUrls: ['./user-main-stats.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserMainStatsComponent implements OnChanges {
  @Input() userId!: number;

  stats$!: Observable<UserStats>;

  constructor(private userService: UserService) { }

  ngOnChanges(): void {
    this.stats$ = this.userService.getUserStats$(this.userId);
  }

  getNextGoal(current: number): number {
    const steps = [0, 10, 50, 100, 500, 1000, 2000, 5000];
    const result = steps.reduce((prev, curr) =>
      (prev <= current) || (curr - current < prev - current) ? curr : prev
    );
    if (result === 0) {
      return Math.ceil(current / 5000) * 5000;
    }
    return result;
  }

}
