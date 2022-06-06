import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UserAction } from 'src/shared/models';

@Component({
  selector: 'app-list-action',
  templateUrl: './list-action.component.html',
  styleUrls: ['./list-action.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListActionComponent {
  @Input() action!: UserAction;

  get fragment(): string {
    return `list${this.action.list!.listId}`;
  }
}
