import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UserTopEntry, UserTopOption } from 'src/shared/models';

@Component({
  selector: 'app-user-top',
  templateUrl: './user-top.component.html',
  styleUrls: ['./user-top.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserTopComponent {
  @Input() topOption!: UserTopOption;
  @Input() users!: UserTopEntry[];

  get topTitle() {
    switch(this.topOption) {
      case 'movies':
        return 'Watched the most movies';
      case 'minutes':
        return 'Spent the most time';
      case 'reviews':
        return 'Wrote the most reviews';
    }
  }
}
