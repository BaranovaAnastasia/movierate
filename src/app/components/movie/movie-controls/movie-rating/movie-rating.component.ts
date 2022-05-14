import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-movie-rating',
  templateUrl: './movie-rating.component.html',
  styleUrls: ['./movie-rating.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieRatingComponent implements OnChanges {
  @Input() voteAvg?: number;
  @Input() voteCount?: number;

  get formattedRating(): string {
    return this.voteAvg!.toFixed(1);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.voteAvg =
      typeof changes.voteAvg.currentValue === 'number'
        ? changes.voteAvg.currentValue
        : changes.voteAvg.previousValue;

    this.voteAvg = this.voteAvg ? this.voteAvg : 0;

    this.voteCount =
      typeof changes.voteCount.currentValue === 'number'
        ? changes.voteCount.currentValue
        : changes.voteCount.previousValue;

    this.voteCount = this.voteCount ? this.voteCount : 0;
  }
}
