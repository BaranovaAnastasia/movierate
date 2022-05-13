import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-movie-rating',
  templateUrl: './movie-rating.component.html',
  styleUrls: ['./movie-rating.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieRatingComponent implements OnChanges {
  @Input() voteAvg?: number;
  @Input() voteCount?: number;

  get formattedRating(): string {
    return this.voteAvg ? this.voteAvg.toFixed(1) : '0.0';
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.voteAvg = typeof changes.voteAvg.currentValue === 'number'
      ? changes.voteAvg.currentValue
      : changes.voteAvg.previousValue;

    this.voteCount = typeof changes.voteCount.currentValue === 'number'
      ? changes.voteCount.currentValue
      : changes.voteCount.previousValue;
  }
}
