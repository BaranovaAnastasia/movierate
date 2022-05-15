import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UserAction } from 'src/shared/models';

@Component({
  selector: 'app-review-action',
  templateUrl: './review-action.component.html',
  styleUrls: ['./review-action.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewActionComponent {
  @Input() action!: UserAction;
}
