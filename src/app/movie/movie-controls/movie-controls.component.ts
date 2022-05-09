import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { MovieStats } from 'src/shared/models';
import { ListsService, UserMovieInteractionService } from 'src/shared/services';

@Component({
  selector: 'app-movie-controls',
  templateUrl: './movie-controls.component.html',
  styleUrls: ['./movie-controls.component.less']
})
export class MovieControlsComponent implements OnInit, OnChanges {

  @Input() movieId?: string;

  voteAvg: string | undefined;
  voteCount: number | undefined;
  watched: number | undefined;

  ratingForm = this.fb.group({
    rating: [0]
  });

  isWatched: boolean | undefined;
  isFavourite: boolean | undefined;

  constructor(
    private userMovieInteractionService: UserMovieInteractionService,
    private listsService: ListsService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.requestStats();
    this.requestIsWatched();
    this.requestIsFavourite();
    this.requestRating();

    const rating = this.ratingForm.get('rating')!;

    rating.valueChanges.pipe(
      switchMap(value =>
        this.userMovieInteractionService.rateMovie$(this.movieId!, value * 2)
      )
    ).subscribe(stats => {
      this.updateStats(stats);
      this.isWatched = true;
    });
  }

  ngOnChanges(): void {
    this.requestStats();
    this.requestIsWatched();
    this.requestIsFavourite();
    this.requestRating();
  }

  get watchedText(): string {
    return this.isWatched ? "watched!" : "add to watched";
  }
  get favouritesText(): string {
    return this.isFavourite ? "favourite!" : "add to favourites";
  }

  markMovieAsWatched(): void {
    if (this.isWatched) {
      this.userMovieInteractionService.unwatchMovie$(this.movieId!)
        .subscribe(
          stats => {
            this.updateStats(stats);
            this.isWatched = false;
            this.ratingForm.setValue(
              { rating: null },
              { emitEvent: false }
            )
          }
        )
      return;
    }

    this.userMovieInteractionService.watchMovie$(this.movieId!)
      .subscribe(
        stats => {
          this.updateStats(stats);
          this.isWatched = true;
        }
      )
  }

  markAsFavourites(): void {
    if (this.isFavourite) {
      this.listsService.removeMovieFromFavourites$(this.movieId!)
        .subscribe(() => this.isFavourite = false);
      return;
    }
    this.listsService.addMovieToFavourites$(this.movieId!)
      .subscribe(() => this.isFavourite = true);
  }

  private requestStats(): void {
    if (!this.movieId) return;

    this.userMovieInteractionService.getStats$(this.movieId).subscribe(
      stats => this.updateStats(stats)
    );
  }

  private requestRating(): void {
    if (!this.movieId) return;

    this.userMovieInteractionService.getRating$(this.movieId).subscribe(
      rating => this.ratingForm.setValue(
        { rating: rating / 2 },
        { emitEvent: false }
      )
    );
  }

  private requestIsWatched(): void {
    if (!this.movieId) return;

    this.userMovieInteractionService.isWatched$(this.movieId).subscribe(
      isWatched => this.isWatched = isWatched
    );
  }

  private requestIsFavourite(): void {
    if (!this.movieId) return;

    this.listsService.isFavourite$(this.movieId).subscribe(
      isFavourite => this.isFavourite = isFavourite
    );
  }

  private updateStats(stats: MovieStats): void {
    this.voteAvg = stats.voteAvg.toFixed(1),
      this.voteCount = stats.voteCount,
      this.watched = stats.watched
  }

}
