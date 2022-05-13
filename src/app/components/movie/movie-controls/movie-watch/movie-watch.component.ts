import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-movie-watch',
  templateUrl: './movie-watch.component.html',
  styleUrls: ['./movie-watch.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieWatchComponent implements OnChanges {
  @Input() isWatched?: boolean;
  @Output() watchedChanges = new EventEmitter<boolean>();

  ngOnChanges(changes: SimpleChanges): void {
    this.isWatched =
      typeof changes.isWatched.currentValue === 'boolean'
        ? changes.isWatched.currentValue
        : changes.isWatched.previousValue;
  }

  get watchedText(): string {
    return this.isWatched ? 'watched!' : 'add to watched';
  }

  watch(): void {
    this.watchedChanges.emit(!this.isWatched);
  }
}
