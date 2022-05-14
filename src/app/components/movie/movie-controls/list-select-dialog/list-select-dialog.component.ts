import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { TuiDialogContext } from '@taiga-ui/core';

@Component({
  selector: 'app-list-select-dialog',
  templateUrl: './list-select-dialog.component.html',
  styleUrls: ['./list-select-dialog.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListSelectDialogComponent {
  activeItemIndex = 0;

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT) readonly context: TuiDialogContext<boolean>,
  ) {}

  close(): void {
    this.context.completeWith(true);
  }
}
