import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  ACTION_LIST,
  ACTION_REVIEW,
  ACTION_RATING,
  ACTION_WATCH,
} from 'src/shared/constants';
import { UserAction } from 'src/shared/models';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionComponent {
  @Input() action!: UserAction;

  types = [ACTION_LIST, ACTION_REVIEW, ACTION_RATING, ACTION_WATCH];
}
