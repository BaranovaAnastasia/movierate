import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-statistics',
  templateUrl: './user-statistics.component.html',
  styleUrls: ['./user-statistics.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserStatisticsComponent {
  @Input() userId!: number;

}
