import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UserAction } from 'src/shared/models';

@Component({
  selector: 'app-watch-action',
  templateUrl: './watch-action.component.html',
  styleUrls: ['./watch-action.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WatchActionComponent {
  @Input() action!: UserAction;
}
