import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UserAction } from 'src/shared/models';

@Component({
  selector: 'app-rating-action',
  templateUrl: './rating-action.component.html',
  styleUrls: ['./rating-action.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingActionComponent {
  @Input() action!: UserAction;
}
