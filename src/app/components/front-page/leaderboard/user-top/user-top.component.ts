import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UserTopEntry, UserTopOption } from 'src/shared/models';
import {
  TOP_BY_MOVIES_TITLE,
  TOP_BY_REVIEWS_TITLE,
  TOP_BY_TIME_TITLE,
} from './constants';

@Component({
  selector: 'app-user-top',
  templateUrl: './user-top.component.html',
  styleUrls: ['./user-top.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTopComponent {
  @Input() topOption!: UserTopOption;
  @Input() users!: UserTopEntry[];

  get topTitle() {
    switch (this.topOption) {
      case 'movies':
        return TOP_BY_MOVIES_TITLE;
      case 'minutes':
        return TOP_BY_TIME_TITLE;
      case 'reviews':
        return TOP_BY_REVIEWS_TITLE;
    }
  }
}
