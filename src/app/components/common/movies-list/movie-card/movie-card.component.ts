import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Movie } from 'src/shared/models';
import { RATING_COLORS } from '../constants';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieCardComponent {
  @Input() movie!: Movie;
  @Input() canDelete: boolean = false;
  @Output() delete = new EventEmitter<Movie>();

  get formattedRating(): string {
    return this.movie.vote_average!.toFixed(1);
  }

  get ratingColor(): string {
    return RATING_COLORS[Math.floor(this.movie.vote_average!)];
  }

  get isUpcoming(): boolean {
    return this.movie.release_date
      ? new Date(this.movie.release_date) > new Date()
      : false;
  }

  deleteMovie(): void {
    this.delete.emit(this.movie);
  }
}
