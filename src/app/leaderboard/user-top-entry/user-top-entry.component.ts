import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UserTopEntry, UserTopOption } from 'src/shared/models';

@Component({
  selector: 'app-user-top-entry',
  templateUrl: './user-top-entry.component.html',
  styleUrls: ['./user-top-entry.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserTopEntryComponent {
  @Input() topOption!: UserTopOption;
  @Input() user!: UserTopEntry;
  @Input() position!: number;

  get resultClass(): string {
    return `result-${this.position}`;
  }

  get result(): string {
    switch(this.topOption) {
      case 'movies':
        return `${this.user.movies_count} movies`;
      case 'minutes':
        return `${Math.round(this.user.minutes_count / 60)} hours`;
      case 'reviews':
        return `${this.user.reviews_count} reviews`;
    }
  }
}
