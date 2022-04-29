import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/shared/models/movie/movie';
import { MovieService } from 'src/shared/services/movie.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.less']
})
export class MovieCardComponent {
  @Input() movie!: Movie;

  get formattedRating(): string {
    const ratingStr = this.movie.vote_average!.toString();
    return ratingStr.length === 3 ? ratingStr : ratingStr + '.0'
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

}
