import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-movie-watched-stats',
  templateUrl: './movie-watched-stats.component.html',
  styleUrls: ['./movie-watched-stats.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieWatchedStatsComponent implements OnChanges {
  @Input() value?: number;

  ngOnChanges(changes: SimpleChanges): void {
    this.value =
      typeof changes.value.currentValue === 'number'
        ? changes.value.currentValue
        : changes.value.previousValue;
  }
}
