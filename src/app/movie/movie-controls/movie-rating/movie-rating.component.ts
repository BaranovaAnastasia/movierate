import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-movie-rating',
  templateUrl: './movie-rating.component.html',
  styleUrls: ['./movie-rating.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieRatingComponent {
  @Input() voteAvg?: number;
  @Input() voteCount?: number;

  get formattedRating(): string {
    return this.voteAvg ? this.voteAvg.toFixed(1) : '0.0';
  }
}
