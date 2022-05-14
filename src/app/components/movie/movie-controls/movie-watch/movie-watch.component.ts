import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ADD_TO_WATCHED_TEXT, IS_WATCHED_TEXT } from '../constants';

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
    return this.isWatched ? IS_WATCHED_TEXT : ADD_TO_WATCHED_TEXT;
  }

  watch(): void {
    this.watchedChanges.emit(!this.isWatched);
  }
}
