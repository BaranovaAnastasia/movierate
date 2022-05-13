import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-movie-watch',
  templateUrl: './movie-watch.component.html',
  styleUrls: ['./movie-watch.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieWatchComponent {
  @Input() isWatched?: boolean;
  @Output() onWatchedChanges = new EventEmitter<boolean>();
  
  get watchedText(): string {
    return this.isWatched ? "watched!" : "add to watched";
  }

  watch(): void {
    this.onWatchedChanges.emit(!this.isWatched);
  }
}
