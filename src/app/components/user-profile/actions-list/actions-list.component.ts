import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserAction } from 'src/shared/models';
import { UserActionService } from 'src/shared/services';

function getDateKey(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function groupByDate(actions: UserAction[]): Map<string, UserAction[]> {
  const map = new Map<string, UserAction[]>();
  actions.forEach(item => {
    const key = getDateKey(item.createdAt);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return new Map(
    [...map.entries()].sort(value => new Date(value[0]).getTime()).reverse(),
  );
}

@Component({
  selector: 'app-actions-list',
  templateUrl: './actions-list.component.html',
  styleUrls: ['./actions-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionstComponent implements OnInit {
  @Input() userId!: number;

  actions$?: Observable<UserAction[] | undefined>;

  groups?: Map<string, UserAction[]>;

  constructor(private actionService: UserActionService) {}

  ngOnInit(): void {
    this.actions$ = this.actionService
      .getUserAction$(this.userId)
      .pipe(tap(actions => (this.groups = groupByDate(actions!))));
  }
}
