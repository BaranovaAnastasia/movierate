import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from 'src/shared/models';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.less']
})
export class MovieCardComponent {
  @Input() movie!: Movie;
  @Input() canDelete: boolean = false;
  @Output() onMovieDelete = new EventEmitter<Movie>();

  get formattedRating(): string {
    return this.movie.vote_average!.toFixed(1)
  }

  get ratingColor(): string {
    if (this.movie.vote_average! >= 9) {
      return "#3AA981";
    }
    if (this.movie.vote_average! >= 8) {
      return "#62C86C";
    }
    if (this.movie.vote_average! >= 7) {
      return "#BFE453"
    }
    if (this.movie.vote_average! >= 5) {
      return "#FCBB14"
    }
    if (this.movie.vote_average! >= 4) {
      return "#FF8A00"
    }
    return "#FF5B45"
  }

  get isUpcoming(): boolean {
    return this.movie.release_date
      ? new Date(this.movie.release_date) > new Date()
      : false;
  }

  deleteMovie(): void {
    this.onMovieDelete.emit(this.movie);
  }

}
