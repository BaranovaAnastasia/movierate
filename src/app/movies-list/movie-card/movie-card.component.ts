import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/shared/models/movie';
import { MovieService } from 'src/shared/services/movie.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.less']
})
export class MovieCardComponent implements OnInit {
  @Input() movieId!: string;
  movie!: Movie;

  constructor(
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    console.log(this.movieId)
    this.movieService.getMovieById(this.movieId).subscribe(
      movie => {
        console.log(movie)
        this.movie = movie;
      }
    );
  }

  get formattedRating(): string {
    const ratingStr = this.movie.statistics!.rating.toString();
    return ratingStr.length === 3 ? ratingStr : ratingStr + '.0'
  }

  get ratingColor(): string {
    if (this.movie.statistics!.rating >= 9) {
      return "#3AA981";
    }
    if (this.movie.statistics!.rating >= 8) {
      return "#62C86C";
    }
    if (this.movie.statistics!.rating >= 7) {
      return "#BFE453"
    }
    if (this.movie.statistics!.rating >= 5) {
      return "#FCBB14"
    }
    if (this.movie.statistics!.rating >= 4) {
      return "#FF8A00"
    }
    return "#FF5B45"
  }

}
