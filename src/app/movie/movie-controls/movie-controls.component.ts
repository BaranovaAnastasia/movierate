import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges } from '@angular/core';
import { MovieStats } from 'src/shared/models';
import { UserMovieInteractionService } from 'src/shared/services';

@Component({
  selector: 'app-movie-controls',
  templateUrl: './movie-controls.component.html',
  styleUrls: ['./movie-controls.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieControlsComponent implements OnChanges {
  @Input() movieId!: string;

  movieStats!: MovieStats;

  constructor(
    private userMovieInteractionService: UserMovieInteractionService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnChanges(): void {
    this.userMovieInteractionService.getStats$(this.movieId)
      .subscribe(stats => this.newMovieStats = stats);
  }

  set newMovieStats(stats: MovieStats) {
    this.movieStats = stats;
    this.changeDetectorRef.detectChanges();
  }

  postRating(value: number) {
    this.userMovieInteractionService.rateMovie$(this.movieId, value)
      .subscribe(stats => this.newMovieStats = stats);
  }

  watchMovie(doWatch: boolean): void {
    if (doWatch) {
      this.userMovieInteractionService.watchMovie$(this.movieId)
        .subscribe(stats => this.newMovieStats = stats);
      return;
    }

    this.userMovieInteractionService.unwatchMovie$(this.movieId)
      .subscribe(stats => this.newMovieStats = stats);
  }

  movieToFavourites(addToFavourites: boolean): void {
    if (addToFavourites) {
      this.userMovieInteractionService.addMovieToFavourites$(this.movieId)
        .subscribe(stats => this.newMovieStats = stats);
      return;
    }
    this.userMovieInteractionService.removeMovieFromFavourites$(this.movieId)
      .subscribe(stats => this.newMovieStats = stats);
  }

}
